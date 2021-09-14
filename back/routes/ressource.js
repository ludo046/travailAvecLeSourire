const models = require("../models");
const asyncLib = require("async");
const jwtUtils = require("../utils/jwt.utils");
const fs = require("fs");
const { invalid, func } = require("joi");
const postRessourceSchema = require("../utils/joi/postRessourceSchema");
const updateRessourceSchema = require('../utils/joi/updateSchema')

const CONTENT_LIMIT = 5000;

module.exports = {
  postRessources: async function (req, res) {
    try {
      const valid = await postRessourceSchema.validateAsync(req.body);
      if (valid) {
        let headerAuth = req.headers["authorization"];
        let userId = jwtUtils.getUserId(headerAuth);

        let title = null
        let content = null;
        let project = null;
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

        if(req.body.title){
          title = String(req.body.title)
          if(title === null){
            return res.status(400).json({error: 'entrer un titre'});
          }
        }
        if (req.body.content) {
          content = String(req.body.content);
          if (content.length > CONTENT_LIMIT) {
            return res.status(400).json({ error: "trop de caractères" });
          }
        }
        if (req.body.project){
            project = String(req.body.project);
            if(project === null){
                return res.status(400).json({error: 'entrer un projet'});
            }
        }
        if(req.body.parcour){
          parcour = String(req.body.parcour);
          if(parcour === null){
            return res.status(400).json({error: 'parcours non renseigner'});
          }
        }

        if (content === null && project === null && attachment === null && movie === null) {
          return res.status(400).json({ error: "remplir au moins un champs" });
        }

        asyncLib.waterfall(
          [
            function (done) {
              models.User.findOne({
                where: { id: userId }
              })
                .then(function (userFound) {
                  console.log(userFound);
                  done(null, userFound);
                })
                .catch(function(error){
                  return res.status(500).json({message: error.message});
                });
            },
            function (userFound, done) {
              if (userFound) {
                models.Ressource.create({
                  userId: userFound.id,
                  title: title,
                  content: content,
                  project: project,
                  image: attachment,
                  movie: movie,
                  parcours: parcour,
                  isAdmin: false
                }).then(function (newRessource) {
                  done(newRessource);
                }).catch(function(err){
                  return res.status(404).json({message: err.message });
                })
              } else {
                res.status(404).json({ error: "user not found" });
              }
            },
          ],
          function (newRessource) {
            if (newRessource) {
              return res.status(201).json(newRessource);
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

  listRessourceDeveloppeurWeb: function (req, res) {
    let fields = req.query.fields;
    let order = req.query.order;

    models.Ressource.findAll({
      order: [order != null ? order.split(":") : ["id", "DESC"]], 
      attributes: fields !== "*" && fields != null ? fields.split(",") : null,
      where:{
        parcours: 'developpeur-web'
      },
      include: [
        {
          model: models.User,
          attributes: ["firstname", "lastname"],
          as: "user_ressource"
        },
      ],
    })
      .then(function (ressource) {
        if (ressource) {
          res.status(200).json(ressource);
        } else {
          res.status(404).json({ error: "aucune ressources trouvée" });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({ error: "invalid fields" });
      });
  },

  listRessourceDeveloppeurFrontend: function (req, res) {
    let fields = req.query.fields;
    let order = req.query.order;

    models.Ressource.findAll({
      order: [order != null ? order.split(":") : ["id", "DESC"]], 
      attributes: fields !== "*" && fields != null ? fields.split(",") : null,
      where:{
        parcours: 'developpeur-frontend'
      },
      include: [
        {
          model: models.User,
          attributes: ["firstname", "lastname"],
          as: "user_ressource"
        },
      ],
    })
      .then(function (ressource) {
        if (ressource) {
          res.status(200).json(ressource);
        } else {
          res.status(404).json({ error: "aucune ressources trouvée" });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({ error: "invalid fields" });
      });
  },

  deleteRessourceDevWeb: function(req,res){
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
    let ressourceId = parseInt(req.params.ressourceId)

    if(userId <= 0){
      return res.status(400).json({error: "utilisateur non reconnu"})
    }
    if(ressourceId <= 0){
      return res.status(400).json({error: "ressource non reconnu"})
    }

    models.Ressource.findOne({
      where:{
        userId: userId,
        id: ressourceId,
        parcours: 'developpeur-web'
      }
    })
    .then(function(ressource){
      if(ressource.image){
        const filename = ressource.image.split("/images/")[1];
        fs.unlink(`images/${filename}`,() =>{
          models.Ressource.destroy({
            where:{
              userId: userId,
              id: ressourceId
            }
          })
          .then(function(){
            res.status(201).json(({ok: "ressource supprimée"}))
          })
          .catch(function (err){
            res.status(400).json({ err });
          })
        });
      } else if(ressource.movie){
        const filename = ressource.movie.split("/images/")[1];
        fs.unlink(`images/${filename}`,() =>{
          models.Ressource.destroy({
            where:{
              userId: userId,
              id: ressourceId
            }
          })
          .then(function(){
            res.status(201).json(({ok: "ressource supprimée"}))
          })
          .catch(function (err){
            res.status(400).json({ err });
          })
        });
      } else {
        models.Ressource.destroy({
          where:{
            userId: userId,
            id: ressourceId
          }
        })
        .then(function(){
          res.status(201).json(({ok: "ressource supprimée"}))
        })
        .catch(function (err){
          res.status(400).json({ err });
        })
      }
    })
    .catch(function(err){
      res.status(400).json({ err });
    })
  },

  deleteRessourceDevFront: function(req,res){
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
    let ressourceId = parseInt(req.params.ressourceId)

    if(userId <= 0){
      return res.status(400).json({error: "utilisateur non reconnu"})
    }
    if(ressourceId <= 0){
      return res.status(400).json({error: "ressource non reconnu"})
    }

    models.Ressource.findOne({
      where:{
        userId: userId,
        id: ressourceId,
        parcours: 'developpeur-frontend'
      }
    })
    .then(function(ressource){
      if(ressource.image){
        const filename = ressource.image.split("/images/")[1];
        fs.unlink(`images/${filename}`,() =>{
          models.Ressource.destroy({
            where:{
              userId: userId,
              id: ressourceId
            }
          })
          .then(function(){
            res.status(201).json(({ok: "ressource supprimée"}))
          })
          .catch(function (err){
            res.status(400).json({ err });
          })
        });
      } else if(ressource.movie){
        const filename = ressource.movie.split("/images/")[1];
        fs.unlink(`images/${filename}`,() =>{
          models.Ressource.destroy({
            where:{
              userId: userId,
              id: ressourceId
            }
          })
          .then(function(){
            res.status(201).json(({ok: "ressource supprimée"}))
          })
          .catch(function (err){
            res.status(400).json({ err });
          })
        });
      } else {
        models.Ressource.destroy({
          where:{
            userId: userId,
            id: ressourceId
          }
        })
        .then(function(){
          res.status(201).json(({ok: "ressource supprimée"}))
        })
        .catch(function (err){
          res.status(400).json({ err });
        })
      }
    })
    .catch(function(err){
      res.status(400).json({ err });
    })
  },

  modifyRessource: async function(req, res){
    try{
      const valid = await updateRessourceSchema.validateAsync(req.body);
      if(valid){
        let headerAuth = req.headers["authorization"];
        let userId = jwtUtils.getUserId(headerAuth);
        const ressourceId = req.params.ressourceId;

        let title = null
        let content = null;
        let attachment = null;
        let movie = null;

        if(userId <= 0){
          return res.status(400).json({error : `nous n'êtes pas identifié`})
        }

        if (req.file) {
          let media = req.file.filename;
          if (media.includes("mp4")) {
            movie = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
          } else {
            attachment = String(`${req.protocol}://${req.get("host")}/images/${req.file.filename}`);
          }
        }
        if(req.body.title){
          title = req.body.title
        }
        if(req.body.content){
          content = req.body.content
        }

        models.Ressource.findOne({
          where:{
            id: ressourceId
          }
        })
        .then(function(modifyRessource){
          let filename = null;
          if(modifyRessource.attachment && content){
               filename = modifyRessource.picture.split("/images/")[1];
          }

          if(modifyRessource.movie && content){
              filename = modifyRessource.movie.split("/images/")[1];
            }
            fs.unlink(`app/images/${filename}`, (err) => {
                if (err) {
                  return console.log(err);
                } else {
                  console.log("image supprimée !");
                }
              });
              return modifyRessource.update({
                title: title ? title : modifyRessource.title,
                content: content ? content : modifyRessource.content,
                image: attachment ? attachment : modifyRessource.attachment,
                movie: movie ? movie : modifyRessource.movie,  
              });
        })
        .then(function(ressource){
          return res.status(201).json(ressource)
        })
        .catch(function(err){
          res.status(500).json({err});
        })
      } else {
        throw error(invalid)
      }
    }catch(error){
      res.status(400).json({message: error.message})
    }
  },

  getOneRessource: function(req, res){
    let headerAuth = req.headers["authorization"];
    let userId = jwtUtils.getUserId(headerAuth);
    const ressourceId = req.params.ressourceId;
    console.log(userId);
    console.log(ressourceId);


    if(userId <= 0){
      return res.status(400).json({error: `nous n'êtes pas identifié`})
    }
    models.Ressource.findOne({
      where: {id: ressourceId}
    })
    .then(function(ressource){
      return res.status(200).json(ressource)
    })
    .catch(function(err){
      return res.status(400).json({error: "ressource inexistante"})
    })
  },
};