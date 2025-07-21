import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const form = formidable({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: function ({ mimetype }) {
        // Only allow image files
        return !!(mimetype && mimetype.includes("image"));
      },
    });

    const [fields, files] = await form.parse(req);

    const uploadedFiles = Array.isArray(files.image)
      ? files.image
      : [files.image];
    const uploadedFile = uploadedFiles[0];

    if (!uploadedFile) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    // Generate a unique filename
    const fileExtension = path.extname(uploadedFile.originalFilename || "");
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const newFileName = `${timestamp}-${randomString}${fileExtension}`;
    const newFilePath = path.join(uploadsDir, newFileName);

    // Rename the file
    fs.renameSync(uploadedFile.filepath, newFilePath);

    // Return the public URL
    const imageUrl = `/uploads/${newFileName}`;

    return res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({
      error: "Failed to upload image",
    });
  }
}
