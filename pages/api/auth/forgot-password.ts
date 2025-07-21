import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { generateOTP, saveOTP } from "@/lib/otpUtils";
import { sendForgotPasswordOTP } from "@/lib/emailService";

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

    // Validate input
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ error: "No account found with this email address" });
    }

    // Generate OTP
    const otp = generateOTP();
    console.log(`🔐 Generated forgot password OTP for ${email}: ${otp}`);

    // Save OTP with 10-minute expiry
    await saveOTP(email, otp, "forgot-password");

    // Send OTP email
    try {
      await sendForgotPasswordOTP(email, user.name, otp);
      console.log(`📧 Forgot password OTP sent to ${email}`);
    } catch (emailError) {
      console.error("❌ Failed to send forgot password OTP email:", emailError);
      return res
        .status(500)
        .json({ error: "Failed to send verification email" });
    }

    res.status(200).json({
      message: "Password reset code sent to your email",
      email: email,
    });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
