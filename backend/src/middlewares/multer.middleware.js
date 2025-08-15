import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const nameWithoutExt = path.parse(file.originalname).name;
    const timestamp = Date.now();
    cb(null, `${nameWithoutExt}_${timestamp}.png`);
  }
});

export const upload = multer({ storage });
