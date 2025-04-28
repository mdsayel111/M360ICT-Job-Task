import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string()
    .max(255)
    .required()
    .messages({
      "string.base": "Title must be a string.",
      "string.max": "Title must not exceed 255 characters.",
      "any.required": "Title is required.",
    }),
  description: Joi.string()
    .optional()
    .allow(null)
    .messages({
      "string.base": "Description must be a string.",
    }),
  published_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Published date must be in YYYY-MM-DD format",
      "any.required": "Published date is required.",
    }),
  author_id: Joi.number()
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

export const updateBookSchema = Joi.object({
  title: Joi.string()
    .max(255)
    .optional()
    .messages({
      "string.base": "Title must be a string.",
      "string.max": "Title must not exceed 255 characters.",
    }),
  description: Joi.string()
    .optional()
    .allow(null)
    .messages({
      "string.base": "Description must be a string.",
    }),
  published_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .messages({
      "string.pattern.base": "Published date must be in YYYY-MM-DD format",
    }),
  author_id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      "number.base": "Author ID must be a number.",
      "number.integer": "Author ID must be an integer.",
      "number.positive": "Author ID must be a positive number.",
    }),
}).min(1);
