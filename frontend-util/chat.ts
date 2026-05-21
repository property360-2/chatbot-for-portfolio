// src/utils/chat.ts
// Replace BACKEND_URL with your deployed Vercel URL after deployment.

const BACKEND_URL = "https://YOUR-BACKEND.vercel.app";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  model: string;
}

/**
 * Sends a message to the portfolio chatbot backend.
 *
 * @param message   - The user's message
 * @param history   - Optional conversation history for multi-turn memory
 */
export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<ChatResponse> {
  const response = await fetch(`${BACKEND_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error ?? `Request failed: ${response.status}`);
  }

  return response.json();
}
