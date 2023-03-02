const joi = require("joi");

const getByIdSchema = joi.object({
    body: {},
    query: {},
    params: { id: joi.string().required() },
});
const getLogoutSchema = joi.object({
    body: {},
    query: {},
    params: {},
});
const postLoginSchema = joi.object({
    body: {
        Username: joi.string().required().max(50).min(2),
        Userpassword: joi.string().required().max(500).min(8),
    },
    query: {},
    params: {},
});
const editUserSchema = joi.object({
    body: {
        Username: joi.string().max(50).min(2),
        UserId: joi.number(),
        Email: joi.string().max(50).min(2).email({ tlds: { allow: false } }),
        Universite: joi.string().max(50).min(2),
        Birthdate: joi.date(),
        Cinsiyet: joi.string().max(5),
        Bolum: joi.string().max(50).min(2),
        media: joi.string()

    },
    query: {},
    params: {},
})
const createSchema = joi.object({
    body: {
        Username: joi.string().required().max(50).min(2),
        Userpassword: joi.string().required().max(500).min(8),
        Email: joi.string().required().max(50).min(2).email({ tlds: { allow: false } }),
        Universite: joi.number().required(),
    },
    query: {},
    params: {},
});

const getCurrentUserSchema = joi.object({
    query: {},
    body: {
        Username: joi.string(),
        UserId: joi.number(),
    },
    params: {}
})

const changePasswordSchema = joi.object({
    body: {
        oldPassword: joi.string().required().min(8).max(500),
        newPassword: joi.string().required().min(8).max(500),
        newPasswordConfirm: joi.string().required().max(500).min(8),
        Username: joi.string().max(50).min(2),
        UserId: joi.number(),
    },
    query: {},
    params: {}
})

module.exports = {
    createSchema,
    postLoginSchema,
    getByIdSchema,
    editUserSchema,
    getCurrentUserSchema,
    getLogoutSchema,
    changePasswordSchema
}
