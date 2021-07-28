const Joi = require('joi');

const loginSchema = Joi.object({

        email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}}),

        password: Joi.string()
        .min(8)
        .max(16)
    })
    module.exports = loginSchema;

    