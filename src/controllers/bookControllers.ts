import { Request, Response } from "express";
import db from "../DB/knex";
import catchAsync from "../middleware/HOF-middleware/catchAsyncMiddleware";
import sendResponse from "../utils/sendResponse";
import AppError from "../customError";
import { createBookSchema, updateBookSchema } from "../lib/joi/bookSchema";

export const getAllbooks = catchAsync(async (req: Request, res: Response) => {
  const { author } = req.query;

  let books;

  if (author) {
    books = await db.select("*").from("books").where({ author_id: author });
  } else {
    books = await db.select("*").from("books");
  }
  sendResponse(res, {
    message: "book retrieved successfully",
    data: books,
  });
});

export const getSinglebook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const book = await db("books").where({ id }).first();
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
      throw new AppError(400, error.details[0].message);
    }

    const [updatedbook] = await db("books")
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

    const [deletebook] = await db("books")
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
    throw new AppError(400, error.details[0].message);
  }

  const [book] = await db("books").insert(value).returning("*");
  sendResponse(res, {
    message: "book created successfully",
    data: book || null,
  });
});
