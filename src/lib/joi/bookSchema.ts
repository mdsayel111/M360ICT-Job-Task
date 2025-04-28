import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().optional().allow(null),
  published_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Pubished date must be in YYYY-MM-DD format",
    }),
  author_id: Joi.number().integer().positive().required(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string().max(255).optional(),
  description: Joi.string().optional().allow(null),
  published_date: Joi.date().optional(),
  author_id: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Pubished date must be in YYYY-MM-DD format",
    })
    .optional(),
}).min(1);
