"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// creat custom AppError
class AppError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        // stack trace of the error
        Error.captureStackTrace(this, this.constructor);
    }
    get stackValue() {
        return this.stack;
    }
    get statusValue() {
        return this.status;
    }
}
exports.default = AppError;
