import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import riskRouter from "./routes/risks.routes.js";
import assessmentRouter from "./routes/assessment.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/risks", riskRouter);
app.use("/api/v1/assessment", assessmentRouter);

export { app };
