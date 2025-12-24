import { ApiResponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/AsyncHandler.js";
import axios from "axios";
import { gemini } from "./geminiapi.js";
import { History } from "../models/history.model.js";
import { ApiError } from "../utils/Apierror.js";

const ML_API_WITH_SOIL =
  "https://crop-pred-with-nutri.onrender.com/predict";

const ML_API_WITHOUT_SOIL =
  "https://crop-pred-without-nutri.onrender.com/predict";


const normalizeInput = (raw) => ({
  temperature: Number(raw.temperature),
  humidity: Number(raw.humidity),
  moisture: Number(raw.soilMoisture ?? raw.moisture),
  soil_type: raw.soilType ?? raw.soil_type,

  // NPK may or may not be present
  nitrogen: raw.nitrogen != null ? Number(raw.nitrogen) : null,
  phosphorus: raw.phosphorus != null ? Number(raw.phosphorus) : null,
  potassium: raw.potassium != null ? Number(raw.potassium) : null,
});


const buildMLRequest = (normalized) => ({
  data: {
    Temparature: normalized.temperature, // ML typo (keep)
    Humidity: normalized.humidity,
    Moisture: normalized.moisture,
    "Soil Type": normalized.soil_type,

    Nitrogen: normalized.nitrogen ?? 0,
    Phosphorous: normalized.phosphorus ?? 0,
    Potassium: normalized.potassium ?? 0,
  },
});

const cropPredictor = asynchandler(async (req, res) => {
  const raw = req.body.data ?? req.body;

  const normalized = normalizeInput(raw);

  
  if (
    Number.isNaN(normalized.temperature) ||
    Number.isNaN(normalized.humidity) ||
    Number.isNaN(normalized.moisture) ||
    !normalized.soil_type
  ) {
    return res.status(422).json(
      new ApiResponse(
        422,
        normalized,
        "Invalid or missing input fields"
      )
    );
  }

 
  const hasSoilTest =
    normalized.nitrogen != null ||
    normalized.phosphorus != null ||
    normalized.potassium != null;

  
  const targetApi = hasSoilTest
    ? ML_API_WITH_SOIL
    : ML_API_WITHOUT_SOIL;

  const mlRequestBody = buildMLRequest(normalized);

  try {
    console.log(
      `Routing to ML service: ${
        hasSoilTest ? "WITH soil test" : "WITHOUT soil test"
      }`
    );
    console.log("SENDING TO ML →", mlRequestBody);

    const predictionResponse = await axios.post(
      targetApi,
      mlRequestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    const prediction =
      predictionResponse.data?.crop_type ??
      predictionResponse.data?.["Predicted Crop"];

    if (!prediction) {
      throw new Error("Invalid ML response");
    }

    const geminiResponse = await gemini(prediction);
    try {
       const history= await History.create({
            user:req.user._id,
            type:"crop-suggestion",
            cropName:prediction,
            confidence:87
      })

    } catch (error) {
      throw new ApiError(409,"failed to store history")
    }
   
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          crop: prediction,
          info: geminiResponse,
          usedSoilTest: hasSoilTest,
        },
        "Crop prediction successful"
      )
    );
  } catch (error) {
    console.error(
      "Crop prediction error →",
      JSON.stringify(error.response?.data || error.message, null, 2)
    );

    return res.status(500).json(
      new ApiResponse(
        500,
        null,
        "Failed to get crop prediction"
      )
    );
  }
});

export default cropPredictor;
