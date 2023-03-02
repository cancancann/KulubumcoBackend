const joi = require("joi");

const createSchema = joi.object({
  body: {
    UniversityName: joi.string().required().max(50).min(2),
    Username:joi.string(),
    UserId:joi.number()
  },
  query: {},
  params: {},
});

const getListSchema = joi.object({
  body: {},
  query: {},
  params: {},
});

const getByIdSchema = joi.object({
  body: {},
  query: {},
  params: { id: joi.string().required() },
});

const getByNameContainsSchema = joi.object({
  body: {},
  query: { name: joi.string().required() },
  params: {},
});

const deleteSchema = joi.object({
  body: {},
  query: {},
  params: { id: joi.string().required() },
});

module.exports = {
  createSchema,
  getListSchema,
  getByIdSchema,
  getByNameContainsSchema,
  deleteSchema
};
