import { Request, Response } from "express";
import db from "../DB/knex";
import catchAsync from "../middleware/HOF-middleware/catchAsyncMiddleware";
import sendResponse from "../utils/sendResponse";
import {
  createAuthorSchema,
  updateAuthorSchema,
} from "../lib/joi/authorSchema";
import AppError from "../customClasses/appError";

export const getAllAuthors = catchAsync(async (req: Request, res: Response) => {
  const { filter, page = "1", limit = "10" } = req.query;
  // Parse page and limit to integers
  const pageValue = parseInt(page as string, 10);
  const limitValue = parseInt(limit as string, 10);

  // Calculate the number of items to skip based on the current page
  const skipValue = (pageValue - 1) * limitValue;

  let authorsPromise;

  // get authors based on the filter query
  authorsPromise = db
    .select("*")
    .from("authors")
    .where(function () {
      if (filter) this.where("name", "ILIKE", `%${filter}%`);
    });

  // add limit and skip to the query
  authorsPromise.offset(skipValue).limit(limitValue);
  const authors = await authorsPromise;
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

    const authorFromDB = await db("authors").where({ id }).first();

    if (!authorFromDB) {
      throw new AppError(404, "Author not found");
    }

    const { error, value } = updateAuthorSchema.validate(data);

    // if data is not valid throw error
    if (error) {
      throw error;
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
    throw error;
  }

  const [author] = await db("authors").insert(value).returning("*");
  sendResponse(res, {
    message: "Author created successfully",
    data: author || null,
  });
});
