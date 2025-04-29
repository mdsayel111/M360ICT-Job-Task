import express, { Request, Response } from "express";
import authorRouter from "./authorRoutes";
import cors from "cors";
import globalErrorHandleMiddleware from "../middleware/globalErrorHandleMiddleware";
import bookRouter from "./bookRoutes";
import loginRouter from "./loginRoutes";
import authMiddleware from "../middleware/authMiddleware";
import cookieParser from "cookie-parser";
const app = express();

// config cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello from Express");
});

app.use("/authors", authMiddleware, authorRouter);
app.use("/books", authMiddleware, bookRouter);
app.use("/login", loginRouter);

// add global error handler
app.use(globalErrorHandleMiddleware);

export default app;
