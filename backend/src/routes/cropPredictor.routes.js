// import { Router } from "express";
// import { upload } from "../middlewares/multer.middleware.js";
// import cropPredictor from "../controllers/cropPredictor.js";

// const router= Router()
// router.route("/predict").post(upload.single("soilTest"), cropPredictor);
// src/routes/cropPredictor.routes.js

import { Router } from "express";
import cropPredictor from "../controllers/cropPredictor.js";

const router = Router();

router.route("/predict").post(cropPredictor);

export default router;