const Joi = require('joi');

const updateUserSchema = Joi.object({
        firstname: Joi.string()
        .max(20)
        .allow(null,''),

        lastname: Joi.string()
        .max(20)
        .allow(null,''),

        email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}})
        .allow(null,''),

        age: Joi.number()
        .allow(null,'')
        .min(18),

        password: Joi.string()
        .allow(null, '')
        .min(8),

        image: Joi.any()
        .allow(null,'')
    })
    module.exports = updateUserSchema;

