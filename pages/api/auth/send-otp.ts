import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// In-memory OTP storage (shared with verify-otp.ts)
// In production, this should be in Redis or database
declare global {
  var otpStorage: Map<string, { otp: string; expires: number }> | undefined;
}

// Use global variable to persist across requests in development
const otpStorage =
  globalThis.otpStorage || new Map<string, { otp: string; expires: number }>();
globalThis.otpStorage = otpStorage;

const ADMIN_EMAIL = "ultimatetours1@gmail.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Only allow admin email for OTP
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return res.status(401).json({ error: "Unauthorized email address" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP with 5-minute expiry
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
    otpStorage.set(email.toLowerCase(), { otp, expires });

    console.log(`\n🔐 ADMIN OTP GENERATED`);
    console.log(`Email: ${email.toLowerCase()}`);
    console.log(`OTP: ${otp}`);
    console.log(`Expires: ${new Date(expires).toLocaleString()}`);
    console.log(`Current time: ${new Date().toLocaleString()}`);
    console.log(`📧 Check your email or use the OTP above`);
    console.log(`Storage size: ${otpStorage.size} entries\n`);

    // Try to send email if configured
    if (
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS &&
      process.env.EMAIL_PASS !== "your-app-password-here"
    ) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Ultimate Tours Admin" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Ultimate Tours Admin Login OTP",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e40af;">Ultimate Tours Admin Login</h2>
              <p>Your OTP for admin panel access:</p>
              <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                <h1 style="font-size: 36px; letter-spacing: 8px; color: #1e40af; margin: 0;">${otp}</h1>
              </div>
              <p>This OTP will expire in 5 minutes.</p>
              <p style="color: #6b7280; font-size: 14px;">If you didn't request this, please ignore this email.</p>
            </div>
          `,
        });

        console.log("📧 OTP email sent successfully");
      } catch (emailError) {
        console.error("📧 Email sending failed:", emailError);
        // Don't fail the request if email fails
      }
    }

    return res.status(200).json({
      message: "OTP sent successfully",
      note: process.env.EMAIL_USER
        ? "Check your email"
        : "Check server console for OTP",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
}
