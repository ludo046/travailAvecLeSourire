const models = require("../models");
const asyncLib = require("async");
const jwtUtils = require("../utils/jwt.utils");
//const fs = require("fs");
const { invalid } = require("joi");
const postRessourceSchema = require("../utils/joi/postRessourceSchema");

const CONTENT_LIMIT = 5000;

module.exports = {
  postRessources: async function (req, res) {
    try {
      const valid = await postRessourceSchema.validateAsync(req.body);
      if (valid) {
        let headerAuth = req.headers["authorization"];
        let userId = jwtUtils.getUserId(headerAuth);

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
              console.log(userFound.id);
              if (userFound) {
                models.Ressourse.create({
                  userId: userFound.id,
                  content: content,
                  project: project,
                  attachment: attachment,
                  movie: movie,
                  parcour: parcour,
                  isAdmin: false
                }).then(function (newRessource) {
                  done(newRessource);
                });
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
}