const Joi = require('joi');

const sendMessageSchema = Joi.object({
             
            message: Joi.string()
            .allow(null,'')
            .max(1200)
            .error(new Error('⚠️ chams limité à 1200 caractères')),

            roomId: Joi.string(),

            image: Joi.any(),

            movie: Joi.any(),
})
    module.exports = sendMessageSchema;
