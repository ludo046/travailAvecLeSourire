const Joi = require('joi');

const loginSchema = Joi.object({

        email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}})
        .error(new Error(`⚠️ Vérifie le format ton email`)),

        password: Joi.string()
        .min(8)
        .max(16)
        .error(new Error('⚠️ Ton mot de passe doit contenir entre 8 et 16 caractères dont un chiffre')),
    })
    module.exports = loginSchema;

    