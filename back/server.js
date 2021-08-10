//imports
const express = require('express');
const apiRouter = require('./apiRouter').router;
const path = require('path');
const helmet = require('helmet')
require('dotenv').config();
const db = require("./models");
db.sequelize.sync();
//db.sequelize.sync({force: true});


//instantiate server
let server = express();

//parser config
server.use(express.urlencoded({ extended:true }));
server.use(express.json());
server.use(helmet());

//configure routes
server.use('/', function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

let http = require('http').Server(server);
//let httpServer = http.Server(server);

let io = require('socket.io')(http);
//let io = socketIO(httpServer);

server.use('/api/', apiRouter);
server.use('/images', express.static(path.join(__dirname, 'images')));

//launch server
http.listen(8080, function(){
    console.log('Server en écoute :)');
})

io.on('connection', function(socket){
    console.log('user connected');
    socket.on('disconnect', function(){
        console.log('user diconnected');
    })
    socket.on('chat message', function(msg){
        console.log('message recu' + msg);
    })
})

