import { GoogleGenAI } from "@google/genai";

// Create a single client object
const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

async function sendMessageToGemini(userMessage: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: userMessage,
  });
  return response;
}

export { sendMessageToGemini };