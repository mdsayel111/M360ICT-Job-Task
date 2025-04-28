import Joi from "joi";
Joi.extend(require("@joi/date"));

export const createAuthorSchema = Joi.object({
  name: Joi.string().max(255).required(),
  bio: Joi.string().optional().allow(null),
  birthdate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Birthdate must be in YYYY-MM-DD format",
    }),
});

export const updateAuthorSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  bio: Joi.string().optional().allow(null),
  birthdate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Birthdate must be in YYYY-MM-DD format",
    })
    .optional(),
}).min(1);
