import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Package from "@/models/Package";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Package ID is required" });
  }

  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const pkg = await Package.findOne({ id });

        if (!pkg) {
          return res.status(404).json({ error: "Package not found" });
        }

        return res.status(200).json(pkg);
      } catch (error) {
        console.error("Error fetching package:", error);
        return res.status(500).json({
          error: "Failed to fetch package",
        });
      }

    case "PUT":
      try {
        const updatedPackage = await Package.findOneAndUpdate(
          { id },
          req.body,
          { new: true, runValidators: true }
        );

        if (!updatedPackage) {
          return res.status(404).json({ error: "Package not found" });
        }

        return res.status(200).json(updatedPackage);
      } catch (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({
          error: "Failed to update package",
        });
      }

    case "DELETE":
      try {
        const deletedPackage = await Package.findOneAndDelete({ id });

        if (!deletedPackage) {
          return res.status(404).json({ error: "Package not found" });
        }

        return res.status(200).json({
          message: "Package deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting package:", error);
        return res.status(500).json({
          error: "Failed to delete package",
        });
      }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
