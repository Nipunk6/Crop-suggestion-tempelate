import { Router } from "express";
import { chatWithAssistant } from "../controllers/chatbot.controller.js";

const router = Router();

router.route("/chat").post(chatWithAssistant);

export default router;
