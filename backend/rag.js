import { embedText } from "./embeddings.js";
import pb from "./memory.js";

export async function getRelevantMemories(query, userId) {
  const vector = await embedText(query);

  // Get all memories of this user:
  const records = await pb.collection("memories").getFullList();

  const scored = records.map(mem => {
    const memVec = JSON.parse(mem.embedding || "[]");
    const score = cosineSimilarity(vector, memVec);
    return {
      id: mem.id,
      title: mem.title,
      content: mem.content,
      score
    };
  });

  // return top 5 memories
  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
}

function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0, A = 0, B = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    A += a[i] * a[i];
    B += b[i] * b[i];
  }
  return dot / (Math.sqrt(A) * Math.sqrt(B));
}
