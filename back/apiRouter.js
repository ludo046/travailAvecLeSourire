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
    apiRouter.route('/ressources/devWeb').get(ressourceCtrl.listRessourceDeveloppeurWeb);
    apiRouter.route('/ressources/devFront').get(ressourceCtrl.listRessourceDeveloppeurFrontend);
    apiRouter.route('/ressources/deleteDevWeb/:ressourceId').delete(ressourceCtrl.deleteRessourceDevWeb);
    apiRouter.route('/ressources/deleteDevFront/:ressourceId').delete(ressourceCtrl.deleteRessourceDevFront);
    apiRouter.route('/ressources/modifyDevWeb/:ressourceId').put(multer,ressourceCtrl.modifyRessource);

    return apiRouter
})();
