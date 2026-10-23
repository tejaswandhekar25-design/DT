// ============================================
// MindMate — Secure Backend Server
// Proxies Seren AI / Gemini API requests
// NEVER exposes API keys to client browsers
// ============================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';

let genAI = null;
if (apiKey && apiKey.length > 10) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
  } catch (err) {
    console.warn('Could not initialize GoogleGenerativeAI SDK:', err.message);
  }
}

const SYSTEM_INSTRUCTION = `
You are Seren, the empathetic, warm, and natural conversational AI companion for MindMate.
You speak like a caring, down-to-earth friend who genuinely listens — NEVER like an academic textbook, a lecturer, or an analytical robot.

VOICE & TONE GUIDELINES:
1. Speak in warm, natural, human language. Use everyday conversational words.
2. STRICTLY AVOID dry theoretical lectures, psychology definitions, or medical essays. Never say "fatigue is defined as..." or "stress is an evolutionary response...".
3. When someone says they are tired, overwhelmed, sad, or stressed, validate their feelings directly with genuine warmth ("I hear you, feeling completely wiped out is so exhausting...").
4. Give 2 or 3 tiny, bite-sized, practical things they can do right now with ZERO pressure (e.g., drink cold water, rest eyes for 5 mins, pick one priority and drop the rest).
5. Always keep responses concise (2 to 3 short, easy-to-read paragraphs).
6. End with a gentle, caring question to let them share more if they want.

SAFETY RULES:
- You are not a medical doctor. Never diagnose illnesses or prescribe medication.
- If the user mentions suicide or severe crisis, immediately provide helplines (India Tele-MANAS 14416 / US 988) with deep compassion.
`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!(apiKey && apiKey.length > 10),
    timestamp: new Date().toISOString(),
  });
});

// Seren Chat Endpoint
app.post('/api/seren', async (req, res) => {
  const { message, profile, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // If Gemini API is not configured or fails, client gracefully falls back
  if (!genAI || !apiKey) {
    return res.status(503).json({
      error: 'Gemini API key is not configured on the server.',
      fallbackToDemo: true,
    });
  }

  try {
    // Attempt with gemini-1.5-flash or gemini-pro
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Build chat context
    const chat = model.startChat({
      history: (history || []).map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
      })),
    });

    const contextPrefix = profile?.displayName
      ? `[User: ${profile.displayName}, Age Group: ${profile.ageGroup || 'General'}, Goals: ${(profile.wellnessGoals || []).join(', ')}] `
      : '';

    const result = await chat.sendMessage(`${contextPrefix}${message}`);
    const response = await result.response;
    const text = response.text();

    res.json({
      reply: text,
      source: 'live-gemini',
    });
  } catch (error) {
    console.error('Gemini API Error:', error?.message || error);
    res.status(500).json({
      error: 'Failed to generate response from Gemini API',
      message: error?.message,
      fallbackToDemo: true,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🌿 MindMate Secure Backend running on http://localhost:${PORT}`);
  console.log(`🔑 Gemini API status: ${apiKey ? 'Configured' : 'Missing API Key in .env'}`);
});
