import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env in development only — hosting envs should provide real env vars
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a local file path to Cloudinary.
 * Returns the Cloudinary response (contains secure_url and public_id).
 * Throws an Error on failure.
 */
const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) throw new Error("Local file path is required for upload");

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // remove the temporary local file (best-effort)
    try {
      await fs.unlink(localFilePath);
    } catch (e) {
      console.warn("Could not remove temp file after successful upload:", e.message);
    }

    // Return the Cloudinary response (has secure_url, public_id, etc.)
    return response;
  } catch (error) {
    // Attempt to remove local file even on failure
    try {
      if (localFilePath) await fs.unlink(localFilePath);
    } catch (e) {
      console.warn("Could not remove temp file after failed upload:", e.message);
    }

    // Throw an Error so callers' try/catch branches run (controller expects exceptions)
    const message = error?.message || "Cloudinary upload failed";
    console.error("Cloudinary upload error:", message);
    throw new Error(message);
  }
};

/** Delete resource by public id (useful on rollback) */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res;
  } catch (err) {
    console.error("Cloudinary delete error:", err?.message || err);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
