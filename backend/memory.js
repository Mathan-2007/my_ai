import PocketBase from "pocketbase";
import dotenv from "dotenv";
dotenv.config();

const pb = new PocketBase(process.env.PB_URL || "http://127.0.0.1:8090");

export default pb;
