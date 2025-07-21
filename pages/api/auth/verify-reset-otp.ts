import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import {
  verifyHashedOTP,
  isOTPExpired,
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

    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ error: "OTP must be 6 digits" });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if there's an OTP for forgot password
    if (!user.otpCode || user.otpPurpose !== "forgot-password") {
      return res.status(400).json({ error: "No password reset request found" });
    }

    // Check if OTP has expired
    if (isOTPExpired(user.otpExpiry)) {
      // Clear expired OTP
      await User.updateOne(
        { _id: user._id },
        {
          $unset: {
            otpCode: 1,
            otpExpiry: 1,
            otpPurpose: 1,
            otpAttempts: 1,
          },
        }
      );
      return res
        .status(400)
        .json({ error: "OTP has expired. Please request a new one." });
    }

    // Check max attempts
    if (hasExceededMaxAttempts(user.otpAttempts || 0)) {
      // Clear OTP after max attempts
      await User.updateOne(
        { _id: user._id },
        {
          $unset: {
            otpCode: 1,
            otpExpiry: 1,
            otpPurpose: 1,
            otpAttempts: 1,
          },
        }
      );
      return res.status(400).json({
        error: "Too many failed attempts. Please request a new OTP.",
      });
    }

    // Verify OTP
    const isValidOTP = verifyHashedOTP(otp, user.otpCode);

    if (!isValidOTP) {
      // Increment attempts
      await User.updateOne({ _id: user._id }, { $inc: { otpAttempts: 1 } });

      const remainingAttempts = 3 - (user.otpAttempts || 0) - 1;
      return res.status(400).json({
        error: `Invalid OTP. You have ${remainingAttempts} attempts remaining.`,
      });
    }

    // OTP is valid - generate a temporary reset token
    const resetToken = require("crypto").randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save reset token and clear OTP
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          resetToken: resetToken,
          resetTokenExpiry: resetTokenExpiry,
        },
        $unset: {
          otpCode: 1,
          otpExpiry: 1,
          otpPurpose: 1,
          otpAttempts: 1,
        },
      }
    );

    console.log(`✅ Password reset OTP verified for ${email}`);

    res.status(200).json({
      message: "OTP verified successfully",
      resetToken: resetToken,
      email: email,
    });
  } catch (error) {
    console.error("❌ Verify reset OTP error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
