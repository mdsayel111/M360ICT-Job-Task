import Joi from 'joi';

export const createBookSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().optional().allow(null),
  published_date: Joi.date().required(),
  author_id: Joi.number().integer().positive().required(),
});

export const updateBookSchema = Joi.object({
    title: Joi.string().max(255).optional(),
    description: Joi.string().optional().allow(null),
    published_date: Joi.date().optional(),
    author_id: Joi.number().integer().positive().optional(),
  }).min(1);
  