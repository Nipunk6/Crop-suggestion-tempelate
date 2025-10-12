import { ApiError } from "../utils/ApiError.js";
import OpenAI from "openai";

// Ensure API key exists
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined in environment variables.");
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generic function to generate content from OpenAI.
 * @param {string} prompt - The input text prompt for the model.
 * @returns {Promise<string>} - The model’s text output.
 */
async function generateContentFromOpenAI(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4o" for higher quality
      messages: [
        {
          role: "system",
          content:
            "You are an agricultural assistant providing short, clear, and practical advice for Indian farmers.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = response.choices[0].message.content.trim();
    console.log("OpenAI API response:", text);
    return text;
  } catch (err) {
    console.error("Error fetching from OpenAI API:", err);
    throw new ApiError(500, `Failed to fetch from OpenAI API: ${err.message}`);
  }
}

/**
 * Generates a short explanation about a crop and its ideal conditions.
 * @param {string} crop
 * @returns {Promise<string>}
 */
export async function gemini(crop) {
  const prompt = `Give an explanation about the crop "${crop}", its ideal growing conditions, and cultivation cost, specifically for Indian farmers. Keep the response under 100 words.`;
  return generateContentFromOpenAI(prompt);
}

/**
 * Generates a short explanation about a plant disease and its solutions.
 * @param {string} disease
 * @returns {Promise<string>}
 */
export async function gemini2(disease) {
  const prompt = `Give an explanation about the plant disease "${disease}", its common causes, and practical solutions for Indian farmers. Keep the response under 100 words.`;
  return generateContentFromOpenAI(prompt);
}
