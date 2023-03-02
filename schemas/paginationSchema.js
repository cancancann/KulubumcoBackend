const joi = require('joi');
const paginateProps = {
  limit: joi.number().default(12).min(1),
  page: joi.number().default(1).min(1),
};
module.exports = paginateProps;