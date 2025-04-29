import { Request, Response } from "express";
import db from "../DB/knex";
import catchAsync from "../middleware/HOF-middleware/catchAsyncMiddleware";
import sendResponse from "../utils/sendResponse";
import AppError from "../customClasses/appError";
import { createBookSchema, updateBookSchema } from "../lib/joi/bookSchema";
import { TBook } from "../types/TBook";

export const getAllbooks = catchAsync(async (req: Request, res: Response) => {
  const { author, filter, page = "1", limit = "10" } = req.query;

  // Parse page and limit to integers
  const pageValue = parseInt(page as string, 10);
  const limitValue = parseInt(limit as string, 10);

  // Calculate the number of items to skip based on the current page
  const skipValue = (pageValue - 1) * limitValue;

  let booksPromise;

  // get books based on the filter query
  booksPromise = db
    .select("*")
    .from("books")
    .where(function () {
      if (author) this.where("author_id", author);
      if (filter) this.where("title", "ILIKE", `%${filter}%`);
    });

  // add limit and skip to the query
  booksPromise.offset(skipValue).limit(limitValue);
  const books: TBook[] = await booksPromise;
  sendResponse(res, {
    message: "book retrieved successfully",
    data: books,
  });
});

export const getSinglebook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const book: TBook = await db("books").where({ id }).first();
  console.log(book);
  sendResponse(res, {
    message: "book retrieved successfully",
    data: book || null,
  });
});

export const updateSinglebook = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const bookFromDB = await db("books").where({ id }).first();

    if (!bookFromDB) {
      throw new AppError(404, "Book not found");
    }

    const { error, value } = updateBookSchema.validate(data);

    // if data is not valid throw error
    if (error) {
      throw error;
    }

    const [updatedbook]: TBook[] = await db("books")
      .where({ id })
      .update(value)
      .returning("*");
    sendResponse(res, {
      message: "book updated successfully",
      data: updatedbook,
    });
  },
);

export const deleteSinglebook = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const [deletebook]:TBook[] = await db("books")
      .where({ id })
      .delete()
      .returning("*");
    sendResponse(res, {
      message: "book deleted successfully",
      data: deletebook,
    });
  },
);

export const createbook = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const { error, value } = createBookSchema.validate(data);

  // if data is not valid throw error
  if (error) {
    throw error;
  }

  const [book]:TBook[] = await db("books").insert(value).returning("*");
  sendResponse(res, {
    message: "book created successfully",
    data: book || null,
  });
});
