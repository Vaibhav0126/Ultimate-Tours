import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      // Check if this is an email-based lookup (for NextAuth sessions)
      const { email } = req.query;

      if (email && typeof email === "string") {
        console.log("🔍 Profile API: Email-based lookup for:", email);

        const user = await User.findOne({ email }).select("-password");
        if (!user) {
          console.error("❌ Profile API: User not found for email:", email);
          return res.status(404).json({ error: "User not found" });
        }

        console.log("✅ Profile API: User found for email lookup:", user.email);
        return res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          isEmailVerified: user.isEmailVerified,
          wishlist: user.wishlist || [],
          preferences: user.preferences,
          provider: user.provider,
          profileImage: user.profileImage,
        });
      }

      // Original JWT-based authentication for custom auth
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization token required" });
      }

      const token = authHeader.substring(7);
      let decoded;

      try {
        decoded = jwt.verify(token, JWT_SECRET) as any;
      } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      const userId = decoded.userId;

      // Get user profile by JWT token
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      console.log("✅ Profile API: User found for JWT lookup:", user.email);
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        isEmailVerified: user.isEmailVerified,
        wishlist: user.wishlist || [],
        preferences: user.preferences,
        provider: user.provider,
        profileImage: user.profileImage,
      });
    }

    if (req.method === "PUT") {
      // For updates, we still require JWT authentication
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization token required" });
      }

      const token = authHeader.substring(7);
      let decoded;

      try {
        decoded = jwt.verify(token, JWT_SECRET) as any;
      } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      const userId = decoded.userId;

      // Update user profile
      const { name, phone, dateOfBirth, preferences } = req.body;

      const updateData: any = {};
      if (name) updateData.name = name.trim();
      if (phone !== undefined) updateData.phone = phone.trim();
      if (dateOfBirth) updateData.dateOfBirth = new Date(dateOfBirth);
      if (preferences) updateData.preferences = preferences;

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      }).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        dateOfBirth: updatedUser.dateOfBirth,
        isEmailVerified: updatedUser.isEmailVerified,
        wishlist: updatedUser.wishlist || [],
        preferences: updatedUser.preferences,
        provider: updatedUser.provider,
        profileImage: updatedUser.profileImage,
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error in user profile API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
