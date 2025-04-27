import express from "express";
import authorRouter from "./authorRoutes";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.use("/authors", authorRouter);

export default app;
