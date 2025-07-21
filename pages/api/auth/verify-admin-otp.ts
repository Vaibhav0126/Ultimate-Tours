import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

// Use the same global OTP storage as send-otp.ts
declare global {
  var otpStorage: Map<string, { otp: string; expires: number }> | undefined;
}

const otpStorage =
  globalThis.otpStorage || new Map<string, { otp: string; expires: number }>();
globalThis.otpStorage = otpStorage;

const ADMIN_EMAIL = "ultimatetours1@gmail.com";
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
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    // Only allow admin email
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return res.status(401).json({ error: "Unauthorized email address" });
    }

    // Check if OTP exists in storage
    const storedOtp = otpStorage.get(email.toLowerCase());

    console.log(`\n🔍 ADMIN OTP VERIFICATION`);
    console.log(`Email: ${email.toLowerCase()}`);
    console.log(`Provided OTP: ${otp}`);
    console.log(`Stored OTP exists: ${!!storedOtp}`);
    console.log(`Storage size: ${otpStorage.size} entries`);

    if (!storedOtp) {
      console.log(`❌ No OTP found in storage for ${email.toLowerCase()}`);
      return res.status(400).json({
        error: "No OTP found. Please request a new verification code.",
      });
    }

    console.log(`Stored OTP: ${storedOtp.otp}`);
    console.log(`Expires: ${new Date(storedOtp.expires).toLocaleString()}`);
    console.log(`Current time: ${new Date().toLocaleString()}`);
    console.log(`Is expired: ${Date.now() > storedOtp.expires}`);

    // Check if OTP is expired
    if (Date.now() > storedOtp.expires) {
      // Remove expired OTP
      otpStorage.delete(email.toLowerCase());
      console.log(`❌ OTP expired and removed from storage`);
      return res.status(400).json({
        error: "OTP has expired. Please request a new verification code.",
      });
    }

    // Verify OTP
    if (storedOtp.otp !== otp) {
      console.log(`❌ OTP mismatch. Expected: ${storedOtp.otp}, Got: ${otp}`);
      return res.status(400).json({
        error: "Invalid OTP. Please check and try again.",
      });
    }

    // OTP is valid - remove it from storage and generate JWT token
    otpStorage.delete(email.toLowerCase());
    console.log(`✅ OTP verified successfully and removed from storage`);

    // Generate JWT token for admin session
    const token = jwt.sign(
      {
        email: email.toLowerCase(),
        role: "admin",
        type: "admin_session",
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log(`🔑 Admin JWT token generated`);
    console.log(`Storage after removal: ${otpStorage.size} entries\n`);

    res.status(200).json({
      message: "Admin authentication successful",
      token: token,
      expiresIn: "24h",
    });
  } catch (error) {
    console.error("❌ Admin OTP verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
