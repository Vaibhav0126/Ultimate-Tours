import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { sendOTPEmail } from "@/lib/emailService";
import {
  generateOTP,
  getOTPExpiry,
  hasExceededMaxAttempts,
} from "@/lib/otpUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { name, email, phone, password, dateOfBirth } = req.body;

    console.log(`📝 REGISTRATION ATTEMPT:`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone || "Not provided"}`);

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email, and password are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please enter a valid email address",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists and is verified
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    console.log(`🔍 Existing user check:`);
    console.log(`- User exists: ${!!existingUser}`);
    if (existingUser) {
      console.log(`- Is verified: ${existingUser.isEmailVerified}`);
      console.log(`- Current OTP: ${existingUser.emailOtp || "NOT SET"}`);
      console.log(`- OTP Attempts: ${existingUser.otpAttempts || 0}`);
    }

    if (existingUser && existingUser.isEmailVerified) {
      return res.status(409).json({
        error: "User with this email already exists and is verified",
      });
    }

    // Check if user exists but is not verified (resend OTP case)
    if (existingUser && !existingUser.isEmailVerified) {
      // Check if user has exceeded max OTP attempts
      if (hasExceededMaxAttempts(existingUser.otpAttempts || 0)) {
        return res.status(429).json({
          error: "Too many OTP attempts. Please try again later.",
        });
      }

      // Generate new OTP
      const otp = generateOTP();
      const otpExpiry = getOTPExpiry();

      console.log(`🔄 UPDATING EXISTING USER:`);
      console.log(`- New OTP: ${otp}`);
      console.log(`- OTP Expiry: ${otpExpiry}`);

      // Update existing user with new OTP
      existingUser.emailOtp = otp;
      existingUser.otpExpiry = otpExpiry;
      existingUser.otpAttempts = 0; // Reset attempts for new OTP

      // Update password and other details if provided
      if (password) {
        const saltRounds = 12;
        existingUser.password = await bcrypt.hash(password, saltRounds);
      }
      if (phone) existingUser.phone = phone.trim();
      if (dateOfBirth) existingUser.dateOfBirth = new Date(dateOfBirth);

      await existingUser.save();

      console.log(`✅ User updated successfully`);

      // Send OTP email
      const emailResult = await sendOTPEmail(email.toLowerCase(), otp, name);
      if (!emailResult.success) {
        console.log(`❌ Email sending failed:`, emailResult.error);
        return res.status(500).json({
          error: "Failed to send verification email. Please try again.",
        });
      }

      console.log(`📧 OTP email sent successfully`);

      return res.status(200).json({
        message:
          "Verification code sent to your email. Please check your inbox.",
        email: email.toLowerCase(),
        resent: true,
      });
    }

    // Create new unverified user
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    console.log(`🆕 CREATING NEW USER:`);
    console.log(`- Generated OTP: ${otp}`);
    console.log(`- OTP Expiry: ${otpExpiry}`);
    console.log(`- Password hashed: ${!!hashedPassword}`);

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      password: hashedPassword,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      emailOtp: otp,
      otpExpiry: otpExpiry,
      otpAttempts: 0,
      isEmailVerified: false,
      provider: "email",
    });

    console.log(`💾 Saving user to database...`);
    await user.save();
    console.log(`✅ User saved with ID: ${user._id}`);

    // Verify the user was saved correctly
    const savedUser = await User.findById(user._id);
    console.log(`🔍 VERIFICATION OF SAVED USER:`);
    console.log(`- Saved user exists: ${!!savedUser}`);
    if (savedUser) {
      console.log(`- Email: ${savedUser.email}`);
      console.log(`- EmailOtp: ${savedUser.emailOtp}`);
      console.log(`- OtpExpiry: ${savedUser.otpExpiry}`);
      console.log(`- IsEmailVerified: ${savedUser.isEmailVerified}`);
    }

    // Send OTP email
    console.log(`📧 Sending OTP email...`);
    const emailResult = await sendOTPEmail(email.toLowerCase(), otp, name);
    if (!emailResult.success) {
      console.log(`❌ Email sending failed:`, emailResult.error);
      // Delete the user if email sending fails
      await User.deleteOne({ _id: user._id });
      console.log(`🗑️ User deleted due to email failure`);
      return res.status(500).json({
        error: "Failed to send verification email. Please try again.",
      });
    }

    console.log(`🎉 Registration successful for: ${email.toLowerCase()}`);

    res.status(201).json({
      message: "Registration successful! Verification code sent to your email.",
      email: email.toLowerCase(),
      userId: user._id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
  }
}
