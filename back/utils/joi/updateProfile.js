const Joi = require('joi');

const updateUserSchema = Joi.object({
        firstname: Joi.string()
        .max(20)
        .error(new Error('⚠️ Ton prénom doit contenir maximum 20 caractères'))
        .allow(null,''),

        lastname: Joi.string()
        .max(20)
        .error(new Error('⚠️ Ton nom doit contenir maximum 20 caractères'))
        .allow(null,''),

        email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}})
        .allow(null,'')
        .error(new Error('⚠️ Vérifie le format de ton email')),

        age: Joi.number()
        .allow(null,'')
        .min(18)
        .error(new Error('⚠️ Tu ne dois toujours pas être mineur')),

        password: Joi.string()
        .allow(null, '')
        .min(8)
        .error(new Error('⚠️ Ton mot de passe doit contenir minimum 8 caractères dont 1 chiffre')),

        image: Joi.any()
        .allow(null,'')
    })
    module.exports = updateUserSchema;

