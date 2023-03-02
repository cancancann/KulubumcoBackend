const joi = require("joi");
const paginateProps = require("./paginationSchema");

const getListSchema = joi.object({
  body: {},
  query: {
    ...paginateProps,
    name:joi.string().min(2).max(50)
  },
  params: {},
});

const createSchema = joi.object({
  body: {
    Username: joi.string(),
    UserId: joi.number(),
    ClubName: joi.string().required().max(50).min(2),
    ClubMail: joi.string().required().max(50).min(10).email(),
    UniversityId: joi.number().required(),
    Description: joi.string().max(1000),
  },
  query: {},
  params: {},
});

const getByIdSchema = joi.object({
  body: {},
  query: {},
  params: { id: joi.string().required() },
});

const deleteSchema = joi.object({
  body: {},
  query: {},
  params: { id: joi.string().required() },
});

const updateSchema = joi.object({
  body: {
    ClubName: joi.string().max(50).min(2),
    ClubMail: joi.string().max(50).min(10).email(),
    Description: joi.string().max(1000),
  },
  query: {},
  params: { id: joi.string().required() },
});

const getByNameContainsSchema = joi.object({
  body: {},
  query: {
    name: joi.string().required(),
    ...paginateProps
  },
  params: {},
});

const getByUniversityIdSchema = joi.object({
  body:{},
  query:{
    universityId: joi.string().required(),
    ...paginateProps
  },
  params:{}
})

module.exports = {
  getListSchema,
  createSchema,
  getByIdSchema,
  deleteSchema,
  updateSchema,
  getByNameContainsSchema,
  getByUniversityIdSchema
};
