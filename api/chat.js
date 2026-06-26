/**
 * @file api/chat.js
 * @description Secure serverless backend handler for the developer portfolio chatbot.
 * Coordinates CORS authentication, dynamically loads local markdown knowledge base documents,
 * establishes LLM assistant rules/prompts, and handles multi-model fallback queries to the Gemini and Groq APIs.
 * Fits into the system as the central backend proxy deployed on Vercel to securely call AI endpoints without
 * exposing private API keys to static clients.
 *
 * Designed in compliance with project style rules.
 */

import fs from "fs";
import path from "path";

// ─── CORS HEADERS ────────────────────────────────────────────────────────────
// Trusted origins authorized to request this API. 
// Includes the local development Astro port and your deployed GitHub Pages domain.

// TODO: Update ALLOWED_ORIGINS when configuring a custom domain or custom staging hosts.
const ALLOWED_ORIGINS = [
  "https://property360-2.github.io", // Jun Alvior's GitHub Pages domain
  "http://localhost:4321",           // Astro dev server
  "http://localhost:3000",           // Alternative dev port
];

/**
 * Configures CORS (Cross-Origin Resource Sharing) headers on the response object.
 * Inspects the incoming Request Origin header and allows credentials/access if
 * the origin matches the predefined ALLOWED_ORIGINS list of trusted client hosts.
 *
 * @param {import('http').IncomingMessage} req - The incoming HTTP request stream containing header origins.
 * @param {import('http').ServerResponse} res - The outgoing HTTP response stream to apply CORS headers on.
 * @returns {void} This function modifies response headers in-place and does not return a value.
 */
function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ─── KNOWLEDGE BASE ──────────────────────────────────────────────────────────
// Reads all .md files from /knowledge and combines them into one context string.

/**
 * Reads, parses, and merges all markdown documents found in the local '/knowledge' directory.
 * Reads files synchronously at server boot/warm start, filters for '.md' file formats,
 * sorts them in alphabetical order to maintain system context consistency, and merges their contents
 * into a unified structured text block for the LLM system prompt.
 *
 * @returns {string} The combined knowledge base context string containing formatted headers and contents.
 */
function loadKnowledge() {
  const knowledgeDir = path.join(process.cwd(), "knowledge");

  if (!fs.existsSync(knowledgeDir)) {
    console.warn("[chat] No knowledge/ directory found. Returning empty context.");
    return "";
  }

  const files = fs
    .readdirSync(knowledgeDir)
    .filter((f) => f.endsWith(".md"))
    .sort(); // consistent order

  if (files.length === 0) {
    console.warn("[chat] knowledge/ directory is empty.");
    return "";
  }

  return files
    .map((file) => {
      const content = fs.readFileSync(path.join(knowledgeDir, file), "utf-8");
      return `\n\n---\n# [${file}]\n\n${content.trim()}`;
    })
    .join("");
}

// Load once at cold start (Vercel caches this between warm invocations)
const PORTFOLIO_KNOWLEDGE = loadKnowledge();

// ─── SYSTEM PROMPT ───────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `
You are the AI assistant embedded in Jun Alvior's developer portfolio website.

Your ONLY job is to answer questions about Jun Alvior using the knowledge base below.

STRICT RULES:
- Answer ONLY using information from the PORTFOLIO KNOWLEDGE BASE section.
- If the answer is not in the knowledge base, respond exactly with:
  "I don't have that information in the portfolio yet."
- Do NOT invent, guess, or hallucinate any projects, skills, experiences, or facts.
- Do NOT answer general coding questions, tutorials, or anything unrelated to the portfolio.
- If asked something off-topic, say: "I'm here to answer questions about Jun Alvior's portfolio. Try asking about his projects, skills, or experience!"

STYLE:
- Friendly and professional tone
- Short, clear responses
- Use bullet points when listing multiple items
- Avoid robotic or overly formal phrasing

PORTFOLIO KNOWLEDGE BASE:
${PORTFOLIO_KNOWLEDGE}
`.trim();

// ─── LLM CHAT COMPLETION PROVIDERS ──────────────────────────────────────────
// Tries models in order. Falls back to the next if one fails or is rate-limited.
// Configured to primarily use Gemini 3.0 Flash and fallback to Groq models.

const MODEL_FALLBACKS = [
  "gemini-2.5-flash",      // primary model (Gemini API)
  "llama-3.1-8b-instant",  // Groq fallback (fast, great for chat)
  "llama3-8b-8192",        // Groq fallback
];

/**
 * Routes and executes an HTTP POST request to either Google's Gemini API or the Groq API
 * depending on the prefix of the selected model. Uses the OpenAI-compatible endpoint for Gemini.
 * Sets deterministic parameters like low temperature (0.3) to minimize factual hallucinations.
 *
 * @param {string} model - The identifier of the specific LLM model to query (e.g. 'gemini-3.0-flash' or 'llama-3.1-8b-instant').
 * @param {Array<{role: string, content: string}>} messages - The structured array of conversation turns.
 * @returns {Promise<any>} A promise resolving to the parsed JSON response body from the LLM provider API.
 * @throws {Error} Throws an explicit error containing response statuses and body text if the request fails.
 */
async function callLLM(model, messages) {
  if (model.startsWith("gemini-")) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set.");
    }
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,   // low = more factual, less creative
        max_tokens: 512,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Gemini [${model}] ${response.status}: ${err}`);
    }

    return response.json();
  } else {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY environment variable is not set.");
    }
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,   // low = more factual, less creative
        max_tokens: 512,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Groq [${model}] ${response.status}: ${err}`);
    }

    return response.json();
  }
}

// ─── CONVERSATION HISTORY ────────────────────────────────────────────────────
// Accepts an optional `history` array from the frontend so the bot remembers
// earlier messages in the same session (client manages state, not server).

/**
 * Filters, structures, and limits the conversation message history for submission to the LLM agent.
 * Sanitizes user and assistant turns, retains only the last 10 messages to protect from token overflow,
 * and appends the latest incoming user message to the final structured array.
 *
 * @param {Array<{role: string, content: any}>} history - An array of previous message turns in the session.
 * @param {string} newMessage - The latest raw text prompt sent by the portfolio visitor.
 * @returns {Array<{role: string, content: string}>} A sanitized and formatted array of message objects.
 */
function buildMessages(history = [], newMessage) {
  const safeHistory = Array.isArray(history)
    ? history
        .filter((m) => m?.role && m?.content)
        .slice(-10) // keep last 10 turns to avoid token overflow
        .map((m) => ({ role: m.role, content: String(m.content) }))
    : [];

  return [
    ...safeHistory,
    { role: "user", content: newMessage },
  ];
}

// ─── MAIN HANDLER ────────────────────────────────────────────────────────────

/**
 * Central serverless handler invoked by Vercel for incoming HTTP requests on the chat endpoint.
 * Coordinates the execution lifecycle: validates request methods (allows POST & OPTIONS for CORS preflight),
 * sets headers, checks message boundaries, builds conversation context, and handles Groq query executions.
 * Implements robust retry fallback logic across multiple LLM models if rate-limits or outages are hit.
 *
 * @param {import('http').IncomingMessage} req - The incoming serverless API request object.
 * @param {import('http').ServerResponse} res - The outgoing serverless API response object.
 * @returns {Promise<void>} Resolves when the HTTP response has been finalized and sent to the client.
 */
export default async function handler(req, res) {
  setCorsHeaders(req, res);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { message, history } = req.body ?? {};

  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({ error: "Field `message` is required and must be a non-empty string." });
  }

  if (message.length > 1000) {
    return res.status(400).json({ error: "Message too long. Max 1000 characters." });
  }

  const conversationMessages = buildMessages(history, message.trim());

  let lastError = null;

  for (const model of MODEL_FALLBACKS) {
    try {
      const data = await callLLM(model, [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationMessages,
      ]);

      const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

      return res.status(200).json({
        reply,
        model, // useful for debugging; remove in production if preferred
      });
    } catch (err) {
      console.error(`[chat] Model ${model} failed:`, err.message);
      lastError = err;
    }
  }

  return res.status(500).json({
    error: "All LLM models failed. Please try again later.",
    details: String(lastError?.message ?? lastError),
  });
}
