"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// HOF for handle error of async function and avoid try catch repeat
const catchAsync = (fun) => {
    // create middleware for catch actual error
    const middleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // call the callback and if any error occur when run callback fun, pass the error to global error handler
        Promise.resolve(fun(req, res, next)).catch((err) => next(err));
    });
    // return the middleware
    return middleware;
};
exports.default = catchAsync;
