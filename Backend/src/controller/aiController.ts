import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const analyzePlant = async (req: any, res: any) => {
  try {
    const { imageBuffer, prompt } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBuffer,
          mimeType: "image/jpeg"
        }
      }
    ]);

    const response = await result.response;
    res.json({ advice: response.text() });

  } catch (error) {
    res.status(500).json({ error: "AI analysis failed!" });
  }
};