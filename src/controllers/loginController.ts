import { Request, Response } from "express";
import db from "../DB/knex";
import { loginSchema } from "../lib/joi/loginSchema";
import catchAsync from "../middleware/HOF-middleware/catchAsyncMiddleware";
import sendResponse from "../utils/sendResponse";
import AppError from "../customError";
import jwt from "jsonwebtoken";
import config from "../config";

export const login = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const { error, value } = loginSchema.validate(data);

  // if data is not valid throw error
  if (error) {
    throw error;
  }

  const token = jwt.sign(data, config.jwtSecret as string);

  // set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  const [author] = await db
    .select("*")
    .from("authors")
    .where({ name: data.name });

  if (!author) {
    throw new AppError(404, "Author not found");
  }
  sendResponse(res, {
    message: "Login successfull",
    data: author || null,
  });
});
