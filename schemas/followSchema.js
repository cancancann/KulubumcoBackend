const joi = require("joi");
const paginateProps = require("./paginationSchema")

const followSchema = joi.object({
  body: {
    ClubId: joi.number().required(),
    Username: joi.string(),
    UserId: joi.number(),
  },
  query: {},
  params: {},
});

const getFollowListByUserIdSchema = joi.object({
  body: {},
  query: { userId: joi.string(), ...paginateProps  },
  params: {},
});

const getFollowerListByClubIdSchema = joi.object({
  body: {},
  query: { clubId: joi.string().required(), ...paginateProps },
  params: {},
});


module.exports = {
  followSchema,
  getFollowListByUserIdSchema,
  getFollowerListByClubIdSchema
};
