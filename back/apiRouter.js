//imports
const express = require('express');
const multer = require('./utils/multer-config')

const userCtrl = require('./routes/userCtrl')
const ressourceCtrl = require('./routes/ressource')

exports.router = (function(){ 

    const apiRouter = express.Router();

    apiRouter.route('/users/register/').post(userCtrl.register);
    apiRouter.route('/users/login/').post(userCtrl.login);

    apiRouter.route('/ressources/new/').post(multer,ressourceCtrl.postRessources);
    apiRouter.route('/ressources/').get(ressourceCtrl.listRessource);

    return apiRouter
})();
