import express from "express";
import authorRouter from "./authorRoutes";
import cors from "cors";
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
app.use("/books", authorRouter);

export default app;
