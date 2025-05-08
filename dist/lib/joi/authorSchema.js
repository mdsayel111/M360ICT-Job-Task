"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAuthorSchema = exports.createAuthorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createAuthorSchema = joi_1.default.object({
    name: joi_1.default.string()
        .max(255)
        .required()
        .messages({
        "string.base": "Name must be a string.",
        "string.max": "Name must not exceed 255 characters.",
        "any.required": "Name is required.",
    }),
    bio: joi_1.default.string()
        .optional()
        .allow(null)
        .messages({
        "string.base": "Bio must be a string.",
    }),
    birthdate: joi_1.default.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
        "string.pattern.base": "Birthdate must be in YYYY-MM-DD format.",
        "any.required": "Birthdate is required.",
    }),
});
exports.updateAuthorSchema = joi_1.default.object({
    name: joi_1.default.string()
        .max(255)
        .optional()
        .messages({
        "string.base": "Name must be a string.",
        "string.max": "Name must not exceed 255 characters.",
    }),
    bio: joi_1.default.string()
        .optional()
        .allow(null)
        .messages({
        "string.base": "Bio must be a string.",
    }),
    birthdate: joi_1.default.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .optional()
        .messages({
        "string.pattern.base": "Birthdate must be in YYYY-MM-DD format.",
    }),
}).min(1);
