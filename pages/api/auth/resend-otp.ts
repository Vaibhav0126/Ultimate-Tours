import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { sendOTPEmail } from "@/lib/emailService";
import {
  generateOTP,
  getOTPExpiry,
  getNextOTPRequestTime,
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

    const { email } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please enter a valid email address",
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        error: "User not found. Please register first.",
      });
    }

    // Check if user is already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        error: "Email is already verified. Please sign in.",
      });
    }

    // Rate limiting - check if enough time has passed since last OTP request
    if (user.updatedAt) {
      const nextRequestTime = getNextOTPRequestTime(user.updatedAt);
      if (new Date() < nextRequestTime) {
        const remainingSeconds = Math.ceil(
          (nextRequestTime.getTime() - new Date().getTime()) / 1000
        );
        return res.status(429).json({
          error: `Please wait ${remainingSeconds} seconds before requesting a new OTP.`,
          remainingSeconds,
        });
      }
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    // Update user with new OTP
    user.emailOtp = otp;
    user.otpExpiry = otpExpiry;
    user.otpAttempts = 0; // Reset attempts for new OTP
    await user.save();

    // Send OTP email
    const emailResult = await sendOTPEmail(email.toLowerCase(), otp, user.name);
    if (!emailResult.success) {
      return res.status(500).json({
        error: "Failed to send verification email. Please try again.",
      });
    }

    res.status(200).json({
      message:
        "New verification code sent to your email. Please check your inbox.",
      email: email.toLowerCase(),
      expiresIn: parseInt(process.env.OTP_EXPIRY_MINUTES || "10"),
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
  }
}
