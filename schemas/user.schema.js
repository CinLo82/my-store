const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const lastname = Joi.string().min(3).max(15);
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }});

const createUserSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  email: email.required()
});

const updateUserSchema = Joi.object({
  name: name,
  lastname: lastname,
  email: email
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema
};
