import axios from "axios";

// 🔥 WILL CONNECT TO OLLAMA OR GPT4ALL SOON

export async function embedText(text) {
  // Dummy embedding until we hook real AI
  return Array(384).fill(Math.random());
}

export async function askLocalAI(message, memories) {
  // 🔥 Here we will call OLLAMA or GPT4ALL

  const memoryText = memories
    .map(m => `- ${m.title}: ${m.content}`)
    .join("\n");

  return `
Memory Context:
${memoryText}

User: ${message}
AI: (AI reply will be added after model integration)
`;
}
