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

    // Extract token from Authorization header
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

    if (req.method === "POST") {
      // Add to wishlist
      const { packageId } = req.body;

      if (!packageId) {
        return res.status(400).json({ error: "Package ID is required" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if package is already in wishlist
      const existingItem = user.wishlist.find(
        (item: any) => item.packageId === packageId
      );

      if (existingItem) {
        return res.status(400).json({ error: "Package already in wishlist" });
      }

      // Add to wishlist
      user.wishlist.push({
        packageId,
        addedAt: new Date(),
      });

      await user.save();

      return res.status(200).json({
        message: "Package added to wishlist",
        wishlist: user.wishlist,
      });
    }

    if (req.method === "DELETE") {
      // Remove from wishlist
      const { packageId } = req.body;

      if (!packageId) {
        return res.status(400).json({ error: "Package ID is required" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Remove from wishlist
      user.wishlist = user.wishlist.filter(
        (item: any) => item.packageId !== packageId
      );

      await user.save();

      return res.status(200).json({
        message: "Package removed from wishlist",
        wishlist: user.wishlist,
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error in wishlist API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
