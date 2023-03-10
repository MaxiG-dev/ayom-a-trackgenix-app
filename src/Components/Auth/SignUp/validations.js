import Joi from 'joi';

export const employeeSchema = Joi.object({
  name: Joi.string()
    .required()
    .pattern(/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/u)
    .min(3)
    .messages({
      'string.empty': 'Name is required.',
      'any.required': 'Name is required.',
      'string.pattern.base': 'All characters must be letters.',
      'string.min': 'Name minimum length is 3.'
    }),
  lastName: Joi.string()
    .required()
    .pattern(/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/u)
    .min(3)
    .messages({
      'string.empty': 'Last Name is required.',
      'any.required': 'Last Name is required.',
      'string.pattern.base': 'All characters must be letters.',
      'string.min': 'Last Name minimum length is 3.'
    }),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .messages({
      'string.empty': 'Email is required.',
      'any.required': 'Email is required.',
      'string.pattern.base': 'Insert a valid email.'
    }),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      'string.empty': 'Password is required.',
      'any.required': 'Password is required.',
      'string.pattern.base': 'Must contain letters, numbers and at least 8 characters long.'
    }),
  repeatPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Password must match',
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.'
  }),
  phone: Joi.string()
    .required()
    .pattern(/^[0-9]+$/)
    .min(9)
    .messages({
      'string.empty': 'Phone is required.',
      'any.required': 'Phone is required.',
      'string.pattern.base': 'All characters must be digits.',
      'string.min': 'Phone minimum length is 9.',
      'string.max': 'Phone maximum length is 15.'
    })
});
