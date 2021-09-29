const Joi = require('joi');

const sendPostSchema = Joi.object({
            title: Joi.string()
            .max(100)
            .error(new Error('⚠️ Titre limité à 100 caractères ou manquant')),
             
            content: Joi.string()
            .allow(null,'')
            .max(1200)
            .error(new Error('⚠️ Titre limité à 1200 caractères')),

            project: Joi.string()
            .required()
            .error(new Error('⚠️ Merci de sélectionner un projet')),


            image: Joi.any(),

            movie: Joi.any(),

            parcour: Joi.string()
            .required()
})
    module.exports = sendPostSchema;
