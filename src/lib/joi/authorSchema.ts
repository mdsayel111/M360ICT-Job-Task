import Joi from "joi";

export const createAuthorSchema = Joi.object({
  name: Joi.string().max(255).required(),
  bio: Joi.string().optional().allow(null),
  birthdate: Joi.date().required(),
});

export const updateAuthorSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  bio: Joi.string().optional().allow(null),
  birthdate: Joi.date().optional(),
}).min(1);
