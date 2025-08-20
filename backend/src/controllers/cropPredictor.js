
import { ApiResponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/AsyncHandler.js";
import axios from "axios";

const cropPredictor = asynchandler(async (req, res) => {
   
   const cropData = req.body; 


   try {
      const predictionResponse = await axios.post(
         "https://crop-prediction-api-0bj5.onrender.com/predict",
         cropData,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      console.log("External API response data:", predictionResponse.json);
      
      const prediction = predictionResponse.data["Predicted Crop"]; 

      return res.status(200).json(new ApiResponse(200, prediction, "Crop prediction successful"));

   } catch (error) {
      console.error("Error fetching prediction from ML service:", error.message);
      return res.status(500).json(new ApiResponse(500, null, "Failed to get crop prediction."));
   }
});

export default cropPredictor;