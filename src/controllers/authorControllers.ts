import { Request, Response } from "express";
import db from "../DB/knex";
import catchAsync from "../middleware/HOF-middleware/catchAsyncMiddleware";
import sendResponse from "../utils/sendResponse";

export const getAllAuthors = catchAsync(async (req: Request, res: Response) => {
  const authors = await db.select("*").from("authors");
  sendResponse(res, {
    message: "Author retrieved successfully",
    data: authors,
  });
});
