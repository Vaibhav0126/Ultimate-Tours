import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { sendWelcomeEmail } from "@/lib/emailService";
import {
  isValidOTPFormat,
  isOTPExpired,
  hasExceededMaxAttempts,
} from "@/lib/otpUtils";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { email, otp } = req.body;

    // Validate required fields
    if (!email || !otp) {
      return res.status(400).json({
        error: "Email and OTP are required",
      });
    }

    // Validate OTP format
    if (!isValidOTPFormat(otp)) {
      return res.status(400).json({
        error: "Invalid OTP format. Please enter a 6-digit code.",
      });
    }

    console.log(`🔍 OTP VERIFICATION ATTEMPT:`);
    console.log(`Email: ${email.toLowerCase()}`);
    console.log(`Provided OTP: ${otp}`);

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log(`❌ User not found for email: ${email.toLowerCase()}`);
      return res.status(404).json({
        error: "User not found. Please register first.",
      });
    }

    console.log(`✅ User found: ${user.email}`);
    console.log(`📋 User details:`);
    console.log(`- isEmailVerified: ${user.isEmailVerified}`);
    console.log(`- emailOtp: ${user.emailOtp || "NOT SET"}`);
    console.log(`- otpExpiry: ${user.otpExpiry || "NOT SET"}`);
    console.log(`- otpAttempts: ${user.otpAttempts || 0}`);
    console.log(`- provider: ${user.provider || "NOT SET"}`);

    // Check if user is already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        error: "Email is already verified. Please sign in.",
      });
    }

    // Check if user has exceeded max OTP attempts
    if (hasExceededMaxAttempts(user.otpAttempts || 0)) {
      return res.status(429).json({
        error: "Too many failed attempts. Please request a new OTP.",
      });
    }

    // Check if OTP exists
    if (!user.emailOtp || !user.otpExpiry) {
      console.log(`❌ OTP data missing:`);
      console.log(`- emailOtp exists: ${!!user.emailOtp}`);
      console.log(`- otpExpiry exists: ${!!user.otpExpiry}`);
      return res.status(400).json({
        error: "No OTP found. Please request a new verification code.",
        debug: {
          hasOtp: !!user.emailOtp,
          hasExpiry: !!user.otpExpiry,
          userId: user._id,
        },
      });
    }

    // Check if OTP is expired
    if (isOTPExpired(user.otpExpiry)) {
      console.log(
        `❌ OTP expired. Expiry: ${user.otpExpiry}, Current: ${new Date()}`
      );
      return res.status(400).json({
        error: "OTP has expired. Please request a new verification code.",
      });
    }

    console.log(`🔍 OTP Comparison:`);
    console.log(`- Stored OTP: "${user.emailOtp}"`);
    console.log(`- Provided OTP: "${otp}"`);
    console.log(`- Match: ${user.emailOtp === otp}`);

    // Verify OTP
    if (user.emailOtp !== otp) {
      // Increment failed attempts
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save();

      const remainingAttempts = Math.max(
        0,
        parseInt(process.env.MAX_OTP_ATTEMPTS || "3") - user.otpAttempts
      );

      console.log(
        `❌ OTP mismatch. Attempts: ${user.otpAttempts}, Remaining: ${remainingAttempts}`
      );

      return res.status(400).json({
        error: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
        remainingAttempts,
      });
    }

    console.log(`✅ OTP verified successfully!`);

    // OTP is valid - verify the user
    user.isEmailVerified = true;
    user.emailOtp = undefined; // Clear OTP
    user.otpExpiry = undefined; // Clear expiry
    user.otpAttempts = 0; // Reset attempts
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: "user",
        provider: user.provider || "email",
        isEmailVerified: true,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.name).catch((error) => {
      console.error("Failed to send welcome email:", error);
    });

    console.log(`🎉 User verified successfully: ${user.email}`);

    res.status(200).json({
      message: "Email verified successfully! Welcome to Ultimate Tours!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        isEmailVerified: user.isEmailVerified,
        profileImage: user.profileImage,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
  }
}
