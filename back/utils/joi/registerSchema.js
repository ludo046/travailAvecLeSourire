const Joi = require('joi');

    const registerSchema = Joi.object({
            firstname: Joi.string()
            .min(2)
            .max(20),
    
            lastname: Joi.string()
            .min(2)
            .max(20),

            age: Joi.number()
            .min(18),
            

            email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}}),
    
            password: Joi.string()
            .min(8)
            .max(16)
    
            
            
        })
        module.exports = registerSchema;
    
    