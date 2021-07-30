const Joi = require('joi');

const sendPostSchema = Joi.object({ 
            content: Joi.string()
            .allow(null,'')
            .max(1200),

            project: Joi.any()
            .required(),


            image: Joi.any(),

            movie: Joi.any(),

            parcour: Joi.string()
            .required()
})
    module.exports = sendPostSchema;
