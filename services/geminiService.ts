import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY;

export const parseChequeDetails = async (promptText: string) => {
  if (!apiKey) {
    throw new Error("API Key not found. Please set your Gemini API Key.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const today = new Date().toISOString().split('T')[0];

  const systemInstruction = `
    You are a helpful banking assistant. Extract cheque details from the user's input.
    Current date is ${today}. 
    If date is not specified in the prompt, use today's date formatted as DD-MM-YYYY.
    If the user mentions "bearer", set isBearer to true, otherwise default to false (crossed cheque).
    If "self" is mentioned, payee is "SELF".
    Convert any spelled out numbers to integers for the 'amount' field.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            payee: { type: Type.STRING },
            amount: { type: Type.NUMBER },
            date: { type: Type.STRING, description: "Format: DD-MM-YYYY" },
            isBearer: { type: Type.BOOLEAN },
          },
          required: ["payee", "amount", "date"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
