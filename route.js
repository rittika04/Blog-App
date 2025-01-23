import { ConnectDB } from "@/lib/config/db";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import formidable from "formidable";
import path from "path";
import fs from "fs";

// Disable bodyParser to allow raw parsing of `multipart/form-data`
export const config = {
  api: {
    bodyParser: false,
  },
};

// Database connection (optional)
const LoadDB = async () => {
  try {
    await ConnectDB();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

LoadDB(); // Connect to the database

// Helper function to parse `multipart/form-data`
async function parseForm(req) {
  const uploadDir = path.resolve("./public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    multiples: false, // Single file upload
    uploadDir, // Directory to save uploaded files
    keepExtensions: true, // Keep the file extension
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

// Handle GET requests
export async function GET(request) {
  console.log("Blog GET Hit");
  return NextResponse.json({ msg: "API is working" });
}

// Handle POST requests
export async function POST(request) {
  try {
    // Parse the incoming form data
    const { files } = await parseForm(request);

    const uploadedFile = files.image;
    if (!uploadedFile) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    // Rename and save the file with a timestamp
    const timestamp = Date.now();
    const newFileName = `${timestamp}_${uploadedFile.originalFilename}`;
    const newFilePath = path.join("./public/uploads", newFileName);

    // Move the uploaded file
    fs.renameSync(uploadedFile.filepath, newFilePath);

    // Return the URL of the uploaded image
    const imgUrl = `/uploads/${newFileName}`;
    console.log("Image uploaded successfully:", imgUrl);

    return NextResponse.json({ imgUrl });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
