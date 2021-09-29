const models = require("../models");
const jwtUtils = require("../utils/jwt.utils");
const fs = require("fs");
const asyncLib = require("async");
const {invalid} = require("joi");
const sendMessageSchema = require('../utils/joi/sendMessageSchema');
const sendRoomMessageSchema = require('../utils/joi/sendRoomMessageSchema');

const CONTENT_LIMIT = 1200;

module.exports = {
    sendMessage: async function(req,res){
        try {
            const valid = await sendMessageSchema.validateAsync(req.body);
            if (valid) {
              let headerAuth = req.headers["authorization"];
              let userId = Number(jwtUtils.getUserId(headerAuth));
      
              let message = null;
              let attachment = null;
              let movie = null;
      
              if (req.file) {
                let media = req.file.filename;
                if (media.includes("mp4")) {
                  movie = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
                } else {
                  attachment = String(`${req.protocol}://${req.get("host")}/images/${req.file.filename}`);
                }
              }
      
              if (req.body.message) {
                message = String(req.body.message);
                if (message.length > CONTENT_LIMIT) {
                  return res.status(400).json({ error: "trop de caractères" });
                }
              }
      
              if (message === null && attachment === null && movie === null) {
                return res.status(400).json({ error: "remplir au moins un champs" });
              }
      
              asyncLib.waterfall(
                [
                  function (done) {
                    return models.User.findOne({
                      where: { id: userId }
                    })
                      .then(function (userFound) {
                        done(null, userFound);
                      })
                      .catch(function(error){
                        return res.status(500).json({message: error.message});
                      });
                  },
                  function (userFound, done) {
                    if (userFound) {
                      models.Chat.create({
                        UserId: userFound.id,
                        message: message,
                        image: attachment,
                        movie: movie,
                      }).then(function (newMessage) {
                        done(newMessage);
                      }).catch(function(error){
                        return res.status(404).json({message: error.message})
                      })
                    } else {
                      res.status(404).json({ error: "user not found" });
                    }
                  },
                ],
                function (newMessage) {
                  if (newMessage) {
                    return res.status(201).json(newMessage);
                  } else {
                    return res.status(500).json({ error: "cannot post message" });
                  }
                }
              );
            } else {
              throw error(invalid);
            }
          } catch (error) {
            res.status(400).json({ error });
          }
    },

    listMessage: function (req, res) {
        let fields = req.query.fields;
        let order = req.query.order;
    
        models.Chat.findAll({
          order: [order != null ? order.split(":") : ["id", "ASC"]],
          attributes: fields !== "*" && fields != null ? fields.split(",") : null,
          include: [
            {
              model: models.User,
              //as: "user_chat",
              attributes: ["firstname", "lastname", "picture"],
            }
          ],
        })
          .then(function (messages) {
            if (messages) {
              res.status(200).json(messages);
            } else {
              res.status(404).json({ error: "no messages found" });
            }
          })
          .catch(function (err) {

            res.status(500).json({ error: "invalid fields" });
          });
      },

      sendRoomMessage: async function(req, res){
        try{
          const valid = await sendRoomMessageSchema.validateAsync(req.body)
          if(valid){
            let headerAuth = req.headers["authorization"];
            let userId = Number(jwtUtils.getUserId(headerAuth));
            let contactId = req.body.contactId;
            let roomId = req.body.roomId
    
            let message = null;
            let attachment = null;
            let movie = null;
    
            if (req.file) {
              let media = req.file.filename;
              if (media.includes("mp4")) {
                movie = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
              } else {
                attachment = String(`${req.protocol}://${req.get("host")}/images/${req.file.filename}`);
              }
            }
    
            if (req.body.message) {
              message = String(req.body.message);
              if (message.length > CONTENT_LIMIT) {
                return res.status(400).json({ error: "trop de caractères" });
              }
            }
    
            if (message === null && attachment === null && movie === null) {
              return res.status(400).json({ error: "remplir au moins un champs" });
            }

            if(userId <= 0){
              return res.status(400).json({error: "veuillez vous identifier"})
            }
            
            if(contactId <= 0){
              return res.status(400).json({error: "contact non trouvé"})
            }
            if(roomId === null){
              return res.status(400).json({error: "roomId non defini"})
            }

            asyncLib.waterfall(
              [
                function (done) {
                  return models.User.findOne({
                    where: { 
                      id: userId,
                    }
                  })
                    .then(function (roomFound) {
                      done(null, roomFound);
                    })
                    .catch(function(error){
                      return res.status(500).json({message: error.message});
                    });
                },
                function (userFound, done) {
                  if (userFound) {
                    models.Chat.create({
                      UserId: userFound.id,
                      contactId: contactId,
                      message: message,
                      image: attachment,
                      movie: movie,
                      roomId: roomId
                    }).then(function (newMessage) {
                      done(newMessage);
                    }).catch(function(error){
                      return res.status(404).json({message: error.message})
                    })
                  } else {
                    res.status(404).json({ error: "user not found" });
                  }
                },
              ],
              function (newMessage) {
                if (newMessage) {
                  return res.status(201).json(newMessage);
                } else {
                  return res.status(500).json({ error: "cannot post message" });
                }
              }
            );
          } else {
            throw error(invalid);
          }
        } catch (error) {
          res.status(400).json({ error });
        }
      },
}