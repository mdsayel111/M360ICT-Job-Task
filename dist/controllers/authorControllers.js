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
exports.createAuthor = exports.deleteSingleAuthor = exports.updateSingleAuthor = exports.getSingleAuthor = exports.getAllAuthors = void 0;
const knex_1 = __importDefault(require("../DB/knex"));
const catchAsyncMiddleware_1 = __importDefault(require("../middleware/HOF-middleware/catchAsyncMiddleware"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const authorSchema_1 = require("../lib/joi/authorSchema");
const appError_1 = __importDefault(require("../customClasses/appError"));
exports.getAllAuthors = (0, catchAsyncMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, page = "1", limit = "10" } = req.query;
    // Parse page and limit to integers
    const pageValue = parseInt(page, 10);
    const limitValue = parseInt(limit, 10);
    // Calculate the number of items to skip based on the current page
    const skipValue = (pageValue - 1) * limitValue;
    let authorsPromise;
    // get authors based on the filter query
    authorsPromise = knex_1.default
        .select("*")
        .from("authors")
        .where(function () {
        if (filter)
            this.where("name", "ILIKE", `%${filter}%`);
    });
    // add limit and skip to the query
    authorsPromise.offset(skipValue).limit(limitValue);
    const authors = yield authorsPromise;
    (0, sendResponse_1.default)(res, {
        message: "Author retrieved successfully",
        data: authors,
    });
}));
exports.getSingleAuthor = (0, catchAsyncMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const author = yield (0, knex_1.default)("authors").where({ id }).first();
    console.log(author);
    (0, sendResponse_1.default)(res, {
        message: "Author retrieved successfully",
        data: author || null,
    });
}));
exports.updateSingleAuthor = (0, catchAsyncMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const authorFromDB = yield (0, knex_1.default)("authors").where({ id }).first();
    if (!authorFromDB) {
        throw new appError_1.default(404, "Author not found");
    }
    const { error, value } = authorSchema_1.updateAuthorSchema.validate(data);
    // if data is not valid throw error
    if (error) {
        throw error;
    }
    const [updatedAuthor] = yield (0, knex_1.default)("authors")
        .where({ id })
        .update(value)
        .returning("*");
    (0, sendResponse_1.default)(res, {
        message: "Author updated successfully",
        data: updatedAuthor,
    });
}));
exports.deleteSingleAuthor = (0, catchAsyncMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const [deleteAuthor] = yield (0, knex_1.default)("authors")
        .where({ id })
        .delete()
        .returning("*");
    (0, sendResponse_1.default)(res, {
        message: "Author deleted successfully",
        data: deleteAuthor,
    });
}));
exports.createAuthor = (0, catchAsyncMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { error, value } = authorSchema_1.createAuthorSchema.validate(data);
    // if data is not valid throw error
    if (error) {
        throw error;
    }
    const [author] = yield (0, knex_1.default)("authors").insert(value).returning("*");
    (0, sendResponse_1.default)(res, {
        message: "Author created successfully",
        data: author || null,
    });
}));
