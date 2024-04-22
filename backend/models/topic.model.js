const Joi = require('joi');
const topicSchema = Joi.object({
    name: Joi.string().required(),
    formatPermissions: {
        video: Joi.boolean().required().default(false),
        text: Joi.boolean().required().default(false),
        image: Joi.boolean().required().default(false)
    },
    thumbnail: Joi.string().required()
});
module.exports = topicSchema;