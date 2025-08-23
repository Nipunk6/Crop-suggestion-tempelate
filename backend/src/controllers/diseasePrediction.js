// import { ApiResponse } from "../utils/apiresponse.js";
// import { asynchandler } from "../utils/AsyncHandler.js";
// import axios from "axios";
// import { gemini } from "./geminiapi.js"; 
// import FormData from "form-data";  
// import fs from "fs/promises";    

// const plantDiseaseDetector = asynchandler(async (req, res) => {

   
//    if (!req.file) {
//       throw new ApiResponse(400, null, "No image file uploaded or processed.");
//    }

//    const localFilePath = req.file.path; 
//    try {
//       const imageBuffer = await fs.readFile(localFilePath);

//       const formData = new FormData();
//       formData.append('file', imageBuffer, {
//           filename: req.file.originalname, 
//           contentType: req.file.mimetype, 
//       });

//       const detectionResponse = await axios.post(
//   "https://crop-prediction-api-0bj5.onrender.com/predict", 
//   formData,
//   {
//      headers: { ...formData.getHeaders() }
//   }
// );

//       const detectedDisease = detectionResponse.data["prediction"]; 
//       console.log("External ML API response data:", detectedDisease);

//       const geminiResponse = await gemini(detectedDisease);
//       if(!geminiResponse) {
//         throw new ApiResponse(404,"No additional information found from Gemini.");
//       }

//       const result={
//         "disease": detectedDisease, 
//         "info": geminiResponse 
//       }

//       return res.status(200).json(new ApiResponse(200, result, "Plant disease detection successful")); // Updated message

//    } catch (error) {
//       console.error("Error during plant disease detection from ML service:", error.message); 
//       if (axios.isAxiosError(error)) {
//           console.error("Axios error response:", error.response?.data);
//           console.error("Axios error status:", error.response?.status);
//           console.error("Axios error headers:", error.response?.headers);
//           return res.status(error.response?.status || 500).json(new ApiResponse(error.response?.status || 500, null, error.response?.data?.message || "Failed to perform plant disease detection from external service.")); // Updated message
//       }
      
//       return res.status(500).json(new ApiResponse(500, null, "Failed to perform plant disease detection."));
//    } finally {
      
//       if (localFilePath && await fs.access(localFilePath).then(() => true).catch(() => false)) {
//           try {
//               await fs.unlink(localFilePath);
//               console.log(`Deleted temporary file: ${localFilePath}`);
//           } catch (cleanupError) {
//               console.error(`Error deleting temporary file ${localFilePath}:`, cleanupError.message);
//           }
//       }
//    }
// });

// export default plantDiseaseDetector; // Export the renamed function

import { ApiResponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/AsyncHandler.js";
import axios from "axios";
import { gemini } from "./geminiapi.js";
import FormData from "form-data";
// import fs from "fs/promises"; // No longer needed for reading/deleting local files

const plantDiseaseDetector = asynchandler(async (req, res) => {

   // 1. Check if an image file was uploaded by the Multer middleware
   if (!req.file) {
      throw new ApiResponse(400, null, "No image file uploaded or processed.");
   }

   // With memoryStorage, the file buffer is directly available in req.file.buffer
   const imageBuffer = req.file.buffer;
   const originalFileName = req.file.originalname;
   const mimeType = req.file.mimetype;

   try {
      // 2. Create a new FormData instance to prepare the image for the external ML model
      const formData = new FormData();
      // Append the in-memory image buffer to the FormData.
      // The field name 'file' here should match what your external ML model expects.
      formData.append('file', imageBuffer, {
          filename: originalFileName,
          contentType: mimeType,
      });

      // 3. Send the FormData (containing the image) to the external ML model API
      const detectionResponse = await axios.post(
         "https://test-1-3-awfp.onrender.com/predict", // Corrected ML model endpoint
         formData, // Send the image data
         {
            headers: {
               // Axios with FormData will automatically set the correct 'Content-Type' header
               // including the boundary for multipart/form-data.
               ...formData.getHeaders(),
            },
            timeout: 30000 // Keep timeout for potentially slow external ML service
         }
      );

      // 4. Extract the disease detection result from the ML model's response
      const detectedDisease = detectionResponse.data.disease || detectionResponse.data["Detected Disease"] || detectionResponse.data["Predicted Crop"];
      console.log("External ML API response data:", detectedDisease);

      // 5. Send the detected disease to your Gemini API for additional information
      const geminiResponse = await gemini(detectedDisease);
      if(!geminiResponse) {
        throw new ApiResponse(404,"No additional information found from Gemini.");
      }

      // 6. Construct the final result object
      const result={
        "disease": detectedDisease,
        "info": geminiResponse
      }

      // 7. Send a successful response back to the client
      return res.status(200).json(new ApiResponse(200, result, "Plant disease detection successful"));

   } catch (error) {
      console.error("Error during plant disease detection from ML service:", error.message);
      if (axios.isAxiosError(error)) {
          console.error("Axios error response:", error.response?.data);
          console.error("Axios error status:", error.response?.status);
          console.error("Axios error headers:", error.response?.headers);
          return res.status(error.response?.status || 500).json(new ApiResponse(error.response?.status || 500, null, error.response?.data?.message || "Failed to perform plant disease detection from external service."));
      }
      return res.status(500).json(new ApiResponse(500, null, "Failed to perform plant disease detection."));
   }
   // No 'finally' block needed here as no local file is created or needs deletion
});

export default plantDiseaseDetector;
