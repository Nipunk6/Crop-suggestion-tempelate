import { GoogleGenerativeAI } from "@google/generative-ai";
import {ApiError} from "../utils/Apierror.js";




const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function gemini(crop) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`Give explaination about the crop ${crop} and give ideal conditions and cost specifically for Indian and their farmers , make it short under 100 words`);
    const text = await result.response.text();
    console.log("Gemini API response:", text);
    return text;
  } catch (err) {
    throw new ApiError(500, "Failed to fetch from Gemini API", err.message);
  }
}

export async function gemini2(disease) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`Give explaination about the disease ${disease} and its solution as well as reason for Indian and their farmers , make it short under 100 words`);
    const text = await result.response.text();
    console.log("Gemini API response:", text);
    return text;
  } catch (err) {
    throw new ApiError(500, "Failed to fetch from Gemini API", err.message);
  }
}
