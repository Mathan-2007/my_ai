import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./chatRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/chat", chatRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
