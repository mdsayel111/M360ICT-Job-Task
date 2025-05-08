"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// global error handle middleware
const globalErrorHandleMiddleware = (err, req, res, next) => {
    // default errObj
    const errObj = {
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
    if (err instanceof joi_1.default.ValidationError) {
        errObj.statusCode = 400;
    }
    // handle jwt error
    if (err instanceof jsonwebtoken_1.default.JsonWebTokenError ||
        err instanceof jsonwebtoken_1.default.TokenExpiredError) {
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
    res.status(errObj.statusCode).send(Object.assign({ success: false }, errObj));
};
exports.default = globalErrorHandleMiddleware;
