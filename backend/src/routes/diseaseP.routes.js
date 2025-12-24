import { Router } from 'express';
import plantDiseaseDetector from "../controllers/diseasePrediction.js" 
import { upload } from '../middlewares/multer.middleware.js'; 
import { verifyJwt } from '../middlewares/auth.middleware.js';
const router = Router();
router.route("/predict").post(verifyJwt,upload.single('image'), plantDiseaseDetector);

export default router;
