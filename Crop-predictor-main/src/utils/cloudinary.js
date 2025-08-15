import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

import { ApiError } from './Apierror.js';




dotenv.config({
         path:"../.env"
});

// Cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

       
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
        
          fs.existsSync(localFilePath) && fs.unlinkSync(localFilePath);

      
        throw new ApiError(500, `Cloudinary upload failed: ${error.message}`);
    }
};

const deleteFronCloudinary = async (publicId) => {
    try {
        const res = await cloudinary.uploader.destroy(publicId);
        return res;
    } catch (error) {
        console.log("Can't delete from Cloudinary:", error);
        return null;
    }
};

export { uploadOnCloudinary, deleteFronCloudinary };