import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(req: Request) {
  try {
    const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { image } = await req.json(); // Base64 image string with prefix (e.g. data:image/jpeg;base64,...)
    if (!image) {
      return NextResponse.json({ error: 'Missing image data' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
      return NextResponse.json({ error: 'Gemini API key is not configured' }, { status: 500 });
    }

    // Extract base64 content and mime type
    const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (!matches || matches.length < 3) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
    }
    const mimeType = matches[1];
    const base64Data = matches[2];

    const prompt = `You are an AI that detects the approximate relative coordinate centers for text fields in a bank cheque image.
Analyze the cheque layout. We need to print text exactly aligned onto these fields.
Identify the X and Y coordinates (as a percentage from 0 to 100 relative to the top-left of the cheque image) where printing should START or be positioned:
1. "date": The start of the DDMMYYYY date boxes (typically top right, around X: 75%, Y: 8%).
2. "payee": The starting position of the payee line (typically middle-left, around X: 10%, Y: 22%).
3. "amountWords": The starting position of the first line for writing the amount in words (typically middle-left, around X: 15%, Y: 30%).
4. "amountNumber": The center/starting position of the box/box area for numeric amount (typically middle-right, around X: 75%, Y: 35%).
5. "bearer": The position of the word "bearer" or "OR BEARER" (typically middle-right, around X: 85%, Y: 22%).
6. "acPayee": The position where a double-cross A/C Payee stamp should go (typically top-left, around X: 15%, Y: 5%).

Return a valid JSON object matching this exact schema:
{
  "date": { "x": number, "y": number },
  "payee": { "x": number, "y": number },
  "amountWords": { "x": number, "y": number },
  "amountNumber": { "x": number, "y": number },
  "bearer": { "x": number, "y": number },
  "acPayee": { "x": number, "y": number }
}
Return ONLY this JSON object. No markdown, no comments, no additional text.`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Data,
                },
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return NextResponse.json({ error: 'Gemini AI service error' }, { status: 502 });
    }

    const result = await response.json();
    const candidateText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!candidateText) {
      return NextResponse.json({ error: 'AI did not return any coordinates' }, { status: 500 });
    }

    const coords = JSON.parse(candidateText.trim());
    return NextResponse.json({ coords });
  } catch (error: any) {
    console.error('Error in detect-fields route:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
