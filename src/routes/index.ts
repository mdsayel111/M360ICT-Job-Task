import express from "express";
import authorRouter from "./authorRoutes";
import cors from "cors";
import globalErrorHandleMiddleware from "../middleware/globalErrorHandleMiddleware";
import bookRouter from "./bookRoutes";
const app = express();

// config cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.use("/authors", authorRouter);
app.use("/books", bookRouter);

// add global error handler
app.use(globalErrorHandleMiddleware);

export default app;
