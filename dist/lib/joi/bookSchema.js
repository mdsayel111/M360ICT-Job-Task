"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookSchema = exports.createBookSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createBookSchema = joi_1.default.object({
    title: joi_1.default.string()
        .max(255)
        .required()
        .messages({
        "string.base": "Title must be a string.",
        "string.max": "Title must not exceed 255 characters.",
        "any.required": "Title is required.",
    }),
    description: joi_1.default.string()
        .optional()
        .allow(null)
        .messages({
        "string.base": "Description must be a string.",
    }),
    published_date: joi_1.default.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
        "string.pattern.base": "Published date must be in YYYY-MM-DD format",
        "any.required": "Published date is required.",
    }),
    author_id: joi_1.default.number()
        .integer()
        .positive()
        .required()
        .messages({
        "number.base": "Author ID must be a number.",
        "number.integer": "Author ID must be an integer.",
        "number.positive": "Author ID must be a positive number.",
        "any.required": "Author ID is required.",
    }),
});
exports.updateBookSchema = joi_1.default.object({
    title: joi_1.default.string()
        .max(255)
        .optional()
        .messages({
        "string.base": "Title must be a string.",
        "string.max": "Title must not exceed 255 characters.",
    }),
    description: joi_1.default.string()
        .optional()
        .allow(null)
        .messages({
        "string.base": "Description must be a string.",
    }),
    published_date: joi_1.default.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .optional()
        .messages({
        "string.pattern.base": "Published date must be in YYYY-MM-DD format",
    }),
    author_id: joi_1.default.number()
        .integer()
        .positive()
        .optional()
        .messages({
        "number.base": "Author ID must be a number.",
        "number.integer": "Author ID must be an integer.",
        "number.positive": "Author ID must be a positive number.",
    }),
}).min(1);
