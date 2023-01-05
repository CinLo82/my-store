const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const clas = Joi.string().min(3).max(15);

const createCategorySchema = Joi.object({
  name: name.required(),
  clas: clas.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
  clas: clas
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
};
