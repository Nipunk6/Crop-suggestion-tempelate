import { ApiResponse } from "../utils/apiresponse";
import { asynchandler } from "../utils/AsyncHandler";

const diseasePredictor = asynchandler(async function (req, res) {
   const image = req.file;
   const prediction = "helloJI"
   return res.status(200).json(new ApiResponse(200, prediction, "Disease prediction successful"));
})

export default diseasePredictor;