import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());  // This should be used directly, not express.cookieParser()

// routes import
import userRouter from './routes/user.routes.js';
import subsciptionRoute from './routes/subscription.routes.js';
import videoRoute from './routes/video.routes.js';

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscribe", subsciptionRoute);
app.use("/api/v1/video", videoRoute);

export { app };
