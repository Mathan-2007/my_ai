import express from "express";
import { getRelevantMemories } from "./rag.js";
import { askLocalAI } from "./embeddings.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, message } = req.body;

  try {
    const memories = await getRelevantMemories(message, userId);
    const aiReply = await askLocalAI(message, memories);

    res.json({
      reply: aiReply,
      usedMemories: memories
    });

  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "AI backend error" });
  }
});

export default router;
