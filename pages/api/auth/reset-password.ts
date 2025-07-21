import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { email, resetToken, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!email || !resetToken || !newPassword || !confirmPassword) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Check password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
      });
    }

    // Validate password strength
    if (newPassword.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if reset token exists and is valid
    if (!user.resetToken || user.resetToken !== resetToken) {
      return res.status(400).json({
        error: "Invalid or expired reset token",
      });
    }

    // Check if reset token has expired
    if (!user.resetTokenExpiry || new Date() > user.resetTokenExpiry) {
      // Clear expired reset token
      await User.updateOne(
        { _id: user._id },
        {
          $unset: {
            resetToken: 1,
            resetTokenExpiry: 1,
          },
        }
      );
      return res.status(400).json({
        error: "Reset token has expired. Please request a new password reset.",
      });
    }

    // Hash the new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user password and clear reset token
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
        },
        $unset: {
          resetToken: 1,
          resetTokenExpiry: 1,
        },
      }
    );

    console.log(`✅ Password reset successfully for ${email}`);

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
