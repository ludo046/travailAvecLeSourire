//imports
const express = require('express');

const userCtrl = require('./routes/userCtrl')

exports.router = (function(){ 

    const apiRouter = express.Router();

    apiRouter.route('/users/register/').post(userCtrl.register);
    apiRouter.route('/users/login/').post(userCtrl.login);

    return apiRouter
})();
