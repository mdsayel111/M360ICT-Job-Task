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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createbook = exports.deleteSinglebook = exports.updateSinglebook = exports.getSinglebook = exports.getAllbooks = void 0;
const knex_1 = __importDefault(require("../DB/knex"));
const catchAsyncMiddleware_1 = __importDefault(require("../middleware/HOF-middleware/catchAsyncMiddleware"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const appError_1 = __importDefault(require("../customClasses/appError"));
const bookSchema_1 = require("../lib/joi/bookSchema");
exports.getAllbooks = (0, catchAsyncMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { author, filter, page = "1", limit = "10" } = req.query;
    // Parse page and limit to integers
    const pageValue = parseInt(page, 10);
    const limitValue = parseInt(limit, 10);
    // Calculate the number of items to skip based on the current page
    const skipValue = (pageValue - 1) * limitValue;
    let booksPromise;
    // get books based on the filter query
    booksPromise = knex_1.default
        .select("*")
        .from("books")
        .where(function () {
        if (author)
            this.where("author_id", author);
        if (filter)
            this.where("title", "ILIKE", `%${filter}%`);
    });
    // add limit and skip to the query
    booksPromise.offset(skipValue).limit(limitValue);
    const books = yield booksPromise;
    (0, sendResponse_1.default)(res, {
        message: "book retrieved successfully",
        data: books,
    });
}));
exports.getSinglebook = (0, catchAsyncMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const book = yield (0, knex_1.default)("books").where({ id }).first();
    console.log(book);
    (0, sendResponse_1.default)(res, {
        message: "book retrieved successfully",
        data: book || null,
    });
}));
exports.updateSinglebook = (0, catchAsyncMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const bookFromDB = yield (0, knex_1.default)("books").where({ id }).first();
    if (!bookFromDB) {
        throw new appError_1.default(404, "Book not found");
    }
    const { error, value } = bookSchema_1.updateBookSchema.validate(data);
    // if data is not valid throw error
    if (error) {
        throw error;
    }
    const [updatedbook] = yield (0, knex_1.default)("books")
        .where({ id })
        .update(value)
        .returning("*");
    (0, sendResponse_1.default)(res, {
        message: "book updated successfully",
        data: updatedbook,
    });
}));
exports.deleteSinglebook = (0, catchAsyncMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const [deletebook] = yield (0, knex_1.default)("books")
        .where({ id })
        .delete()
        .returning("*");
    (0, sendResponse_1.default)(res, {
        message: "book deleted successfully",
        data: deletebook,
    });
}));
exports.createbook = (0, catchAsyncMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { error, value } = bookSchema_1.createBookSchema.validate(data);
    // if data is not valid throw error
    if (error) {
        throw error;
    }
    const [book] = yield (0, knex_1.default)("books").insert(value).returning("*");
    (0, sendResponse_1.default)(res, {
        message: "book created successfully",
        data: book || null,
    });
}));
