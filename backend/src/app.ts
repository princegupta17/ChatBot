import express from "express";
import { config } from "dotenv";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

config();
const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1", router);

export default app;
