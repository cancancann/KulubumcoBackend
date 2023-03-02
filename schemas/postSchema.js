const joi = require("joi");
const paginateProps = require("./paginationSchema");

const createSchema = joi.object({
  body: {
    Username: joi.string(),
    UserId: joi.number(),
    ClubId: joi.number().required(),
    PostHeader: joi.string().required().min(10).max(50),
    PostText: joi.string().required().max(300).min(10),
  },
  query: {},
  params: {},
});

const getByIdSchema = joi.object({
  body: {
    Username: joi.string(),
    UserId: joi.number(),
  },
  query: {},
  params: { id: joi.string().required() },
});

const getAllSchema = joi.object({
  body: { Username: joi.string(), UserId: joi.number() },
  query: { ...paginateProps, postHeader: joi.string() },
  params: {},
});

const getByClubIdSchema = joi.object({
  body: { Username: joi.string(), UserId: joi.number() },
  query: { clubId: joi.string().required(), ...paginateProps },
  params: {},
});

const updateSchema = joi.object({

  body: {
    Username: joi.string(),
    UserId: joi.number(),
    PostHeader: joi.string().max(50).min(10),
    PostText: joi.string().max(300).min(10)
  },
  query: {},
  params: { id: joi.string().required() },
})

const deleteSchema = joi.object({
  body: {
    Username: joi.string(),
    UserId: joi.number(),
  },
  query: {},
  params: { id: joi.string().required() },
})
const getByUniversiteIdSchema = joi.object({
  body: {

  },
  query: {},
  params: { id: joi.string().required() },
})
module.exports = {
  createSchema,
  getByIdSchema,
  getAllSchema,
  getByClubIdSchema,
  updateSchema,
  deleteSchema,
  getByUniversiteIdSchema
};
