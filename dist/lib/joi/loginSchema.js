"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginSchema = joi_1.default.object({
    name: joi_1.default.string()
        .max(255)
        .required()
        .messages({
        "string.base": "Name must be a string.",
        "string.max": "Name must not exceed 255 characters.",
        "any.required": "Name is required.",
    }),
});
