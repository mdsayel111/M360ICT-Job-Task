import express from "express";
import {
  createAuthor,
  deleteSingleAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateSingleAuthor,
} from "../controllers/authorControllers";
import authMiddleware from "../middleware/authMiddleware";

const authorRouter = express.Router();

authorRouter
  .get("/", authMiddleware, getAllAuthors)
  .get("/:id", authMiddleware, getSingleAuthor)
  .post("/", createAuthor)
  .put("/:id", authMiddleware, updateSingleAuthor)
  .delete("/:id", authMiddleware, deleteSingleAuthor);
export default authorRouter;
