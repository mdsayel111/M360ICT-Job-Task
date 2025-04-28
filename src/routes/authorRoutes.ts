import express from "express";
import {
  createAuthor,
  deleteSingleAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateSingleAuthor,
} from "../controllers/authorControllers";

const authorRouter = express.Router();

authorRouter
  .get("/", getAllAuthors)
  .get("/:id", getSingleAuthor)
  .post("/", createAuthor)
  .put("/:id", updateSingleAuthor)
  .delete("/:id", deleteSingleAuthor);
export default authorRouter;
