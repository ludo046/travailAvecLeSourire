const Joi = require('joi');

const sendMessageSchema = Joi.object({
             
            message: Joi.string()
            .allow(null,'')
            .max(1200),

            image: Joi.any(),

            movie: Joi.any(),
})
    module.exports = sendMessageSchema;
