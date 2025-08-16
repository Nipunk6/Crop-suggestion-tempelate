import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import diseasePredictor from "../controllers/diseaseD.js";

const router= Router()
router.route("/predict").post(upload.single("image"), diseasePredictor);
