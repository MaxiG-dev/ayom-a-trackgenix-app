import Joi from 'joi';

export const taskSchema = Joi.object({
  description: Joi.string().valid('BE', 'FE').required()
});
