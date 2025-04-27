import express from "express";
import { getAllAuthors } from "../controllers/authorControllers";

const authorRouter = express.Router();

authorRouter.get("/", getAllAuthors);

export default authorRouter;
