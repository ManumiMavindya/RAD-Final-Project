import { Request, Response } from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const askAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API Key missing");
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.status(200).json({ reply: response.text() });
  } catch (error) {
    console.error("Backend Error:", error); 
    res.status(500).json({ error: "AI service error" });
  }
};