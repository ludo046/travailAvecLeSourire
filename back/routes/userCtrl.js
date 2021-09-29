const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models')
const asyncLib = require('async');
const {invalid} = require('joi');
const registerSchema = require('../utils/joi/registerSchema');
const loginSchema = require('../utils/joi/loginSchema');
const updateUserSchema = require('../utils/joi/updateProfile');
const nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');
const { message } = require('../utils/joi/registerSchema');
const { generateTokenForUser } = require('../utils/jwt.utils');
require("dotenv").config();



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
                    return res.status(400).json({ message : 'tous les champs de sont pas remplis' });
                }
                if(age < 18){
                    return res.status(400).json({ 'error' : `Vous n'avez pas l'âge requis` });
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
                                // return res.status(201).json({
                                //     'userId' : newUser.id,
                                //     token: jwtUtils.generateTokenForUser(newUser)dd
                                // })
                                let token = jwtUtils.generateTokenForUser(newUser);
                               let transport = nodemailer.createTransport({
                                   service:"gmail",
                                   host: 'smtp.gmail.com',
                                   port: 587,
                                   secure: true,
                                   auth: {
                                       user: 'travailaveclesourire@gmail.com',
                                       pass: 'Fripon046'
                                   }
                               });
                               let mailOption = {
                                   from: process.env.USER,
                                   to: newUser.email,
                                   subject: 'valider votre compte',
                                   html: `<h1>Email de Confirmation</h1>
                                          <h2>Bonjour ${newUser.firstname},</h2>
                                          <p>Merci pour ton inscription sur travailAvecLeSourire, pour valider votre compte merci de cliquer sur le bouton ci-dessous.</p>
                                          <a href='http://travailaveclesourire.fr/welcome/${token}'><button>Validez votre compte</button></a>`
                               };
                               
                               transport.sendMail(mailOption, (error, info) => {
                                   if(error){
                                       return console.log(error);
                                   } else {
                                        console.log('message send :', info.messageId);
                                        console.log('preview url : ', nodemailer.getTestMessageUrl(info));
                                   }

                               })
                               res.send({message: 'ok'})
                            })
                            .catch(function(error){
                                return res.status(500).json({message: error.message})
                            })
                        })
                    } else {
                        return res.status(409).json({ 'error' : 'un compte utilisateur existe déjà avec cette adress mail' });
                    }
                })
                .catch(function(error){
                    return res.status(500).json({message: error.message})
                })
            } else {
                throw error(invalid)
            }
        }catch (error){
            res.status(400).json({message: error.message})
        }
    },

    verificationUser: function(req,res){
        const token = req.body.token;
        const userId = jwtUtils.getUserId(token)

        models.User.findOne({
            userId: userId
        })
        .then((user) => {
            if(!user){
                return res.status(404).json({message : 'user not found'});
            } else {
                res.send({
                    connection: true,
                    token: generateTokenForUser(userId),
                    userId: userId
                })
            }
        })
        .catch((e) => console.log('error', e));
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
            res.status(400).json({message: error.message})
        }
    },

    getAllUser: function(req,res){
        let headerAuth = req.headers["authorization"];
        let userId = jwtUtils.getUserId(headerAuth);
        let fields  = req.query.fields;
        let order   = req.query.order;

        if(userId <= 0){
            return res.status(400).json({error: 'veuillez vous authentifier'})
        }
        
        models.User.findAll({
            order: [(order != null) ? order.split(':') : ['id']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        }).then(function (users){
            if(users){
                return res.status(200).json(users)
            } else {
                res.status(404).json({error : 'aucun utilisateur trouvé'})
            }
        }).catch(function (err){
            res.status(500).json({message: err.message})
        })
    },

    getUserProfile: function(req, res){
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth)

        if(userId <= 0 ){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }

        models.User.findOne({
            attributes: ['firstname', 'lastname', 'email', 'age', 'picture'],
            where: {id: userId}
        }).then(function(user){
            if(user){
                res.status(201).json(user);
            } else {
                res.status(404).json({'error': 'utilisateur non trouvé'});
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    },

    modifyProfile: async function(req, res){
        try{
            const valid = await updateUserSchema.validateAsync(req.body);
            if(valid){
                const headerAuth = req.headers['authorization'];
                const userId = jwtUtils.getUserId(headerAuth)

                const firstname = req.body.firstname;
                const lastname = req.body.lastname;
                const email = req.body.email;
                const age = req.body.age;
                let picture = "";
                if(req.file){
                    picture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;  
                }
                
        
                if(userId <= 0 ){
                    return res.status(400).json({'error': `vous n'êtes pas identifié`});
                }

                asyncLib.waterfall([
                    function(done){
                        models.User.findOne({
                            where: {id: userId}
                        }).then(function(userFound){
                            done(null, userFound);
                        }).catch(function(err){
                            return res.status(500).json({message: err.message})
                        })
                    },
                    function(userFound, done){
                        if(userFound){
                            userFound.update({
                                firstname: (firstname ? firstname : userFound.firstname),
                                lastname: (lastname ? lastname : userFound.lastname),
                                email: (email ? email : userFound.email),
                                age: (age ? age : userFound.age),
                                picture: (picture ? picture : userFound.picture)
                            }).then(function(){
                                done(userFound);
                            }).catch(function(err){
                                return res.status(500).json({message: err.message})
                            });
                        } else {
                            res.status(404).json({ 'error': 'user not found' })
                        }
                    },
                ], function(userFound){
                    if(userFound){
                        return res.status(201).json(userFound);
                    } else {
                        return res.status(500).json({'error' : 'impossible de mettre le profil à jour'})
                    }
                })
            } else {
                throw invalid({error})
            }
        }catch(error){
            res.status(400).json({message: error.message})
        }

    }
}