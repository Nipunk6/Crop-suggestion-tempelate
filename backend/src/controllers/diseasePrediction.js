import { ApiResponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/AsyncHandler.js";
import axios from "axios";
import { gemini } from "./geminiapi.js"; 
import FormData from "form-data";  
import fs from "fs/promises";  
import { uploadOnCloudinary } from "../utils/cloudinary.js"; 

const plantDiseaseDetector = asynchandler(async (req, res) => {

   
   if (!req.file) {
      throw new ApiResponse(400, null, "No image file uploaded or processed.");
   }

   const localFilePath = req.file.path; 
   console.log("Received file path:", localFilePath);
   try {
      const imageBuffer = await uploadOnCloudinary(localFilePath);
      console.log("Uploaded image to Cloudinary:", imageBuffer);

      // const formData = new FormData();
      // formData.append('file', imageBuffer, {
      //     filename: req.file.originalname, 
      //     contentType: req.file.mimetype, 
      // });

      const detectionResponse = await axios.post(
  "https://crop-prediction-api-0bj5.onrender.com/predict", 
  imageBuffer.url,
  {
     headers: { "Content-Type": "application/json" }
  }
);

      const detectedDisease = detectionResponse.data["prediction"]; 
      console.log("External ML API response data:", detectedDisease);

      const geminiResponse = await gemini2(detectedDisease);
      if(!geminiResponse) {
        throw new ApiResponse(404,"No additional information found from Gemini.");
      }

      const result={
        "disease": detectedDisease, 
        "info": geminiResponse 
      }

      return res.status(200).json(new ApiResponse(200, result, "Plant disease detection successful")); // Updated message

   } catch (error) {
      console.error("Error during plant disease detection from ML service:", error.message); 
      if (axios.isAxiosError(error)) {
          console.error("Axios error response:", error.response?.data);
          console.error("Axios error status:", error.response?.status);
          console.error("Axios error headers:", error.response?.headers);
          return res.status(error.response?.status || 500).json(new ApiResponse(error.response?.status || 500, null, error.response?.data?.message || "Failed to perform plant disease detection from external service.")); // Updated message
      }
      
      return res.status(500).json(new ApiResponse(500, null, "Failed to perform plant disease detection."));
   } finally {
      
      if (localFilePath && await fs.access(localFilePath).then(() => true).catch(() => false)) {
          try {
              await fs.unlink(localFilePath);
              console.log(`Deleted temporary file: ${localFilePath}`);
          } catch (cleanupError) {
              console.error(`Error deleting temporary file ${localFilePath}:`, cleanupError.message);
          }
      }
   }
});

export default plantDiseaseDetector; // Export the renamed function

