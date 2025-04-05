import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: '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',
  defaultHeaders: {
    "HTTP-Referer": process.env.YOUR_SITE_URL,
    "X-Title": process.env.YOUR_SITE_NAME,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// In-memory conversation history
const conversationHistory = new Map();

// System prompt for log analysis
const SYSTEM_PROMPT = `
You are an expert log analysis assistant with deep knowledge of system diagnostics. Your task is to:

1. Analyze provided logs systematically
2. Identify error patterns and root causes
3. Explain errors in simple terms
4. Provide step-by-step solutions
5. Maintain conversation context

Follow this analysis framework:
- Error Identification: Classify error types (network, database, auth, etc.)
- Impact Assessment: Determine severity and affected components
- Root Cause: Explain likely underlying causes
- Solution Plan: Provide actionable remediation steps
- Prevention: Suggest ways to avoid recurrence

Format responses clearly with:
1. Error Summary
2. Root Cause Analysis
3. Recommended Actions
4. Prevention Tips
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { sessionId = "default-session", message, logs = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get or initialize conversation history
    let conversation = conversationHistory.get(sessionId) || [];
    
    // Add user message to history
    conversation.push({ role: "user", content: message });
    
    // Include logs if provided
    if (logs.length > 0) {
      conversation.push({
        role: "system",
        content: `User provided these logs for analysis:\n${logs.join("\n")}`
      });
    }

    // Prepare messages for API
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversation
    ];

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o", // Specialized for technical analysis
      messages,
      temperature: 0.2, // Lower for more precise technical responses
      max_tokens: 3000,
    });

    if (!completion.choices?.[0]?.message?.content) {
      return res.status(500).json({ error: "Invalid response from AI service" });
    }

    const aiResponse = completion.choices[0].message.content;
    
    // Add AI response to conversation history
    conversation.push({ role: "assistant", content: aiResponse });
    conversationHistory.set(sessionId, conversation);

    res.json({ 
      reply: aiResponse,
      sessionId 
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message 
    });
  }
});

// Get conversation history (optional)
app.get("/api/conversation/:sessionId", (req, res) => {
  const conversation = conversationHistory.get(req.params.sessionId) || [];
  res.json({ conversation });
});

app.listen(PORT, () => {
  console.log(`Log Analysis Chatbot running on http://localhost:${PORT}`);
});