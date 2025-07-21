import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

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

    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
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
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Check if this is a Google OAuth user trying to log in with password
    if (user.googleId && !user.password) {
      return res.status(400).json({
        error:
          "This account was created with Google. Please sign in with Google.",
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({
        error:
          "Please verify your email before signing in. Check your inbox for verification code.",
        emailVerificationRequired: true,
        email: user.email,
      });
    }

    // Verify password
    if (!user.password) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: "user",
        provider: user.provider || "email",
        isEmailVerified: user.isEmailVerified,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return success response
    res.status(200).json({
      message: "Login successful",
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
        wishlist: user.wishlist,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
  }
}
