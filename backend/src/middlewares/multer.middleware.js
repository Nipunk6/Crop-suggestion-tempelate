// middlewares/multer.middleware.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// compute absolute upload dir
const uploadDir = path.join(__dirname, "../..", "public", "temp");

// One-time ensure directory exists (logs for debugging)
try {
  console.log("MULTER: process.cwd() =", process.cwd());
  console.log("MULTER: computed uploadDir =", uploadDir);

  if (!fs.existsSync(uploadDir)) {
    console.log("MULTER: uploadDir does not exist. Creating ->", uploadDir);
    fs.mkdirSync(uploadDir, { recursive: true });
  } else {
    console.log("MULTER: uploadDir exists ->", uploadDir);
  }
} catch (err) {
  console.error("MULTER: Failed to ensure upload dir:", err);
}

// Storage config (diskStorage gives req.file.path)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Multer requires the destination to exist. We're ensuring it above.
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // use path.extname to get extension safely
    const ext = path.extname(file.originalname) || "";
    // safe filename (fieldname + unique + ext)
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// optional: simple image-only filter (adjust to your needs)
const imageFileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeOk = !!file.mimetype && allowed.test(file.mimetype);
  const extOk = allowed.test(ext);
  if (mimeOk && extOk) cb(null, true);
  else cb(new Error("Only image files are allowed (jpg, jpeg, png, webp)"));
};

// limits: 5MB by default (adjustable)
const limits = { fileSize: 5 * 1024 * 1024 };

export const upload = multer({
  storage,
  limits,
  fileFilter: imageFileFilter,
});
