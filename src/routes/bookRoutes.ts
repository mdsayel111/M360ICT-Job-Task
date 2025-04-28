import express from "express";
import { getAllBooks } from "../controllers/bookControllers";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);

export default bookRouter;
