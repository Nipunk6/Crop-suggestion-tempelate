import { ApiResponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/AsyncHandler.js";

const cropPredictor = asynchandler(async function cropPredictor(req, res) {
   const cropData = req.body;
   const soilTest = req.file;
   const prediction = "hello"
   return res.status(200).json(new ApiResponse(200, prediction, "Crop prediction successful"));
})

export default cropPredictor;