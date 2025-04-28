import Joi from "joi";

export const createAuthorSchema = Joi.object({
  name: Joi.string()
    .max(255)
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.max": "Name must not exceed 255 characters.",
      "any.required": "Name is required.",
    }),
  bio: Joi.string()
    .optional()
    .allow(null)
    .messages({
      "string.base": "Bio must be a string.",
    }),
  birthdate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Birthdate must be in YYYY-MM-DD format.",
      "any.required": "Birthdate is required.",
    }),
});

export const updateAuthorSchema = Joi.object({
  name: Joi.string()
    .max(255)
    .optional()
    .messages({
      "string.base": "Name must be a string.",
      "string.max": "Name must not exceed 255 characters.",
    }),
  bio: Joi.string()
    .optional()
    .allow(null)
    .messages({
      "string.base": "Bio must be a string.",
    }),
  birthdate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .messages({
      "string.pattern.base": "Birthdate must be in YYYY-MM-DD format.",
    }),
}).min(1);
