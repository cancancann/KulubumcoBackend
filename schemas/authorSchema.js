const joi = require("joi");



const getByUserIdSchema = joi.object({
    body: {
        Username: joi.string(),
        UserId: joi.number(),
    },
    query: {},
    params: {},
});
const getByKulupIdSchema = joi.object({
    body: {
        Username: joi.string(),
        UserId: joi.number(),
    },
    query: {},
    params: { id: joi.string().required() },
});
const addAuthorSchema = joi.object({
    body: {
        User: joi.required(),
        Club: joi.required(),
        Username: joi.string(),
        UserId: joi.number(),
    },
    query: {},
    params: {},
});
const deleteAuthorSchema = joi.object({
    body: {
        User: joi.required(),
        Club: joi.required(),
        Username: joi.string(),
        UserId: joi.number(),
    },
    query: {},
    params: {},
});
module.exports = {
    getByUserIdSchema,
    getByKulupIdSchema,
    addAuthorSchema,
    deleteAuthorSchema
};