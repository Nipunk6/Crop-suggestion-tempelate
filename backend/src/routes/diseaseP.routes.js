import { Router } from 'express';
import plantDiseaseDetector from "../controllers/diseasePrediction.js" 
import { upload } from '../middlewares/multer.middleware.js'; 
const router = Router();
router.route("/predict").post(upload.single('image'), plantDiseaseDetector);

export default router;
