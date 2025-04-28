import { Request, Response } from "express";
import db from "../DB/knex";
import catchAsync from "../middleware/HOF-middleware/catchAsyncMiddleware";
import sendResponse from "../utils/sendResponse";
import {
  createAuthorSchema,
  updateAuthorSchema,
} from "../lib/joi/authorSchema";
import AppError from "../customError";

export const getAllAuthors = catchAsync(async (req: Request, res: Response) => {
  const authors = await db.select("*").from("authors");
  sendResponse(res, {
    message: "Author retrieved successfully",
    data: authors,
  });
});

export const getSingleAuthor = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const author = await db("authors").where({ id }).first();
    console.log(author);
    sendResponse(res, {
      message: "Author retrieved successfully",
      data: author || null,
    });
  },
);

export const updateSingleAuthor = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const { error, value } = updateAuthorSchema.validate(data);

    // if data is not valid throw error
    if (error) {
      throw new AppError(400, error.details[0].message);
    }

    const [updatedAuthor] = await db("authors")
      .where({ id })
      .update(value)
      .returning("*");
    sendResponse(res, {
      message: "Author updated successfully",
      data: updatedAuthor,
    });
  },
);

export const deleteSingleAuthor = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const [deleteAuthor] = await db("authors")
      .where({ id })
      .delete()
      .returning("*");
    sendResponse(res, {
      message: "Author deleted successfully",
      data: deleteAuthor,
    });
  },
);

export const createAuthor = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const { error, value } = createAuthorSchema.validate(data);

  // if data is not valid throw error
  if (error) {
    throw new AppError(400, error.details[0].message);
  }

  const [author] = await db("authors").insert(value).returning("*");
  sendResponse(res, {
    message: "Author created successfully",
    data: author || null,
  });
});
