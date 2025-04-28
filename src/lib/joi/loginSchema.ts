import Joi from "joi";

export const loginSchema = Joi.object({
  name: Joi.string()
    .max(255)
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.max": "Name must not exceed 255 characters.",
      "any.required": "Name is required.",
    }),
});