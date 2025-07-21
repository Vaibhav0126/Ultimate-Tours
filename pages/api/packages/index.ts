import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Package from "@/models/Package";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const packages = await Package.find({}).sort({ createdAt: -1 });
        return res.status(200).json(packages);
      } catch (error) {
        console.error("Error fetching packages:", error);
        return res.status(500).json({
          error: "Failed to fetch packages",
        });
      }

    case "POST":
      try {
        // Generate unique ID
        const id = Date.now().toString();

        const packageData = {
          ...req.body,
          id,
        };

        const newPackage = new Package(packageData);
        await newPackage.save();

        return res.status(201).json(newPackage);
      } catch (error) {
        console.error("Error creating package:", error);
        return res.status(500).json({
          error: "Failed to create package",
        });
      }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
