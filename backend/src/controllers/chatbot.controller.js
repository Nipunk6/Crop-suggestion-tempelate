import { ApiResponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/AsyncHandler.js";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined in environment variables.");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const chatWithAssistant = asynchandler(async (req, res) => {
  const { message } = req.body || {};

  if (!message || typeof message !== "string") {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Please provide a 'message' string."));
  }

  const prompt = `You are an agricultural schemes assistant for India. Be concise. If asked for a scheme, share eligibility and the official URL if known. User: ${message}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You help farmers with Indian government schemes, eligibility, and official links. Keep answers short.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
  });

  const reply =
    completion.choices[0]?.message?.content?.trim() ||
    "I couldn't generate a reply.";

  return res.status(200).json(new ApiResponse(200, { reply }, "ok"));
});
