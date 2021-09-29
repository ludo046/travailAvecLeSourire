const Joi = require('joi');

    const registerSchema = Joi.object({
            firstname: Joi.string()
            .min(2)
            .max(20)
            .error(new Error('⚠️ Vérifie le format de ton prénom')),
    
            lastname: Joi.string()
            .min(2)
            .max(20)
            .error(new Error('⚠️ Vérifie le format de ton nom')),

            age: Joi.number()
            .min(18)
            .error(new Error(`⚠️ Inscription refusé tu n'a pas 18 ans`)),
            

            email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}})
            .error(new Error('⚠️ Vérifie le format de ton email')),
    
            password: Joi.string()
            .min(8)
            .max(16)
            .error(new Error('⚠️ Ton mot de passe doit contenir entre 8 et 16 caractères dont un chiffre')),
    
            
            
        })
        module.exports = registerSchema;
    
