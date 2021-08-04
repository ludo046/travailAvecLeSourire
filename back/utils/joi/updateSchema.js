const Joi = require('joi');

const sendPostSchema = Joi.object({
            title: Joi.string()
            .max(100),
             
            content: Joi.string()
            .allow(null,'')
            .max(1200),

            image: Joi.any(),

            movie: Joi.any(),

})
    module.exports = sendPostSchema;
