/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint  no-unused-vars: "error" */
import { ErrorRequestHandler } from "express";
import Joi from "joi";
import { TErrorObj } from "../types/TError";
import jwt from "jsonwebtoken";

// global error handle middleware
const globalErrorHandleMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // default errObj
  const errObj: TErrorObj = {
    statusCode: err.status || 500,
    message: err.message || "Something went wrong !",
    errorMessages: [
      {
        path: "",
        message: err.message || "Something went wrong !",
      },
    ],
    stack: "",
  };

  // handle joi error
  if (err instanceof Joi.ValidationError) {
    errObj.statusCode = 400;
  }

  // handle jwt error
  if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.TokenExpiredError
  ) {
    errObj.statusCode = 400;
    errObj.message = "Invalid token";
    errObj.errorMessages = [
      {
        path: "",
        message: "Invalid token",
      },
    ];
  }

  // if server run in production delete stack from errObj, so stack doesn't send with response
  if (process.env.NODE_ENV === "production") {
    delete errObj.stack;
  }

  // if status comes for authentication, then set statusCode to errObj
  if (err.status === 401) {
    errObj.statusCode = 401;
  }

  console.log(err, "error");

  // send response if any error occur
  res.status(errObj.statusCode).send({ success: false, ...errObj });
};

export default globalErrorHandleMiddleware;
