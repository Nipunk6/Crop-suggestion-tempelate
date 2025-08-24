// import multer from "multer";

// //allowing disk storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     //cb=callback
//     cb(null, "./public/temp");
//   },
//   filename: (req, file, cb) => {
//     // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     // cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//     cb(null, file.originalname); // Using original name for simplicity
//   },
// });

// export const upload = multer({
//   storage,
// });
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../..", "public", "temp"); // Absolute path
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`); // Use unique filename
  },
});

export const upload = multer({
  storage,
});
