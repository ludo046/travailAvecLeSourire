const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models')
const asyncLib = require('async');
const {invalid} = require('joi');
const registerSchema = require('../utils/joi/registerSchema');
const loginSchema = require('../utils/joi/loginSchema');


module.exports = {

    register: async function (req,res) {
        try{
            const valid = await registerSchema.validateAsync(req.body);
            if(valid){
                const firstname = req.body.firstname;
                const lastname = req.body.lastname;
                const age = req.body.age;
                const email = req.body.email;
                const password = req.body.password;

                if(firstname == null || lastname == null || age == null || email == null ||password == null) {
                    return res.status(400).json({ 'error' : 'tous les champs de sont pas remplis' });
                }
                if(age < 18){
                    return res.status(400).json({ 'error' : `Vous n'avez pas l'age requis` });
                }

                models.User.findOne({
                    attributes: ['email'],
                    where: {email: email}
                })
                .then(function(userFound){
                    if(!userFound){
                        bcrypt.hash(password, 10, function(err, bcryptedPassword){
                            const newUser = models.User.create({
                                firstname: firstname,
                                lastname: lastname,
                                age: age,
                                email: email,
                                password: bcryptedPassword,
                                isAdmin: 0
                            })
                            .then(function(newUser){
                                return res.status(201).json({
                                    'userId' : newUser.id,
                                    token: jwtUtils.generateTokenForUser(newUser)
                                })
                            })
                            .catch(function(error){
                                return res.status(500).json({error})
                            })
                        })
                    } else {
                        return res.status(409).json({ 'error' : 'un compte utilisateur existe déjà avec cette adress mail' });
                    }
                })
            } else {
                throw error(invalid)
            }
        }catch (error){
            res.status(400).json({error})
        }
    },

    login: async function(req, res) {
        try{
            const valid = await loginSchema.validateAsync(req.body);
            if(valid){
                const email = req.body.email;
                const password = req.body.password;

                if(email == null || password == null){
                    return res.status(400).json({'error' : 'tous les champs ne sont pas remplis'});
                }
                models.User.findOne({
                    where: {email: email}
                })
                .then(function(userFound){
                    if(userFound){
                        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                            if(resBycrypt){
                                return res.status(200).json({
                                    'userId' : userFound.id,
                                    'isAdmin' : userFound.isAdmin,
                                    'token' : jwtUtils.generateTokenForUser(userFound)
                                })
                            } else {
                                return res.status(403).json({'error': 'mot de passe incorrect'});
                            }
                        })
                    } else {
                        return res.status(404).json({'error': 'utilisateur inexistant '})
                    }
                })
                .catch(function(err){
                    return res.status(500).json({'error' : `impossible de verifier l'utilisateur`})
                })
            } else {
                throw error(invalid)
            }
        }catch(error){
            res.status(400).json({error})
        }
    },
}