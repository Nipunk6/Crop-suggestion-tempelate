// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';
// import dotenv from 'dotenv';

// import { ApiError } from './Apierror.js';




// dotenv.config({
//          path:"../.env"
// });

// // Cloudinary configuration
// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null;

 
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         });

       
//         if (fs.existsSync(localFilePath)) {
//             fs.unlinkSync(localFilePath);
//         }

//         return response;
//     } catch (error) {
        
//           fs.existsSync(localFilePath) && fs.unlinkSync(localFilePath);

      
//         throw new ApiError(500, `Cloudinary upload failed: ${error.message}`);
//     }
// };

// const deleteFronCloudinary = async (publicId) => {
//     try {
//         const res = await cloudinary.uploader.destroy(publicId);
//         return res;
//     } catch (error) {
//         console.log("Can't delete from Cloudinary:", error);
//         return null;
//     }
// };

// export { uploadOnCloudinary, deleteFronCloudinary };
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // Log the actual error that occurred during upload
    console.error("Cloudinary Upload Failed:", error.message);
    console.error("Cloudinary Error Details:", error);

    // Attempt to remove the locally saved temporary file even if upload fails
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
        console.log(`Deleted temporary file after failed Cloudinary upload: ${localFilePath}`);
      } catch (unlinkError) {
        console.error(`Error deleting temporary file ${localFilePath} after Cloudinary failure:`, unlinkError.message);
      }
    }
    return null;
  }
};

export { uploadOnCloudinary };
