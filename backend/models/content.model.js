const Joi = require('joi');

const contentSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    topic: Joi.string().required(),
    url: Joi.string().required(),
    createdAt: Joi.date().required(),
    type: Joi.string().required()
});
module.exports = contentSchema;