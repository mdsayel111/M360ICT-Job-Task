import express from "express";
import {
  createbook,
  deleteSinglebook,
  getAllbooks,
  getSinglebook,
  updateSinglebook,
} from "../controllers/bookControllers";

const bookRouter = express.Router();

bookRouter
  .get("/", getAllbooks)
  .get("/:id", getSinglebook)
  .post("/", createbook)
  .put("/:id", updateSinglebook)
  .delete("/:id", deleteSinglebook);
export default bookRouter;
