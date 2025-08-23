// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp");
//   },
//   filename: function (req, file, cb) {
//     const nameWithoutExt = path.parse(file.originalname).name;
//     const timestamp = Date.now();
//     cb(null, `${nameWithoutExt}_${timestamp}.png`);
//   }
// });

// export const upload = multer({ storage });

// backend > src > middlewares > multer.middleware.js

import multer from "multer";

// Configure Multer to store the entire file in memory as a Buffer
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });

// No need for 'path' or 'fs' related logic here, as files are not written to disk
