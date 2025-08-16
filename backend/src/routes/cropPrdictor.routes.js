import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import cropPredictor from "../controllers/cropPredictor.js";

const router= Router()
router.route("/predict").post(upload.single("soilTest"), cropPredictor);