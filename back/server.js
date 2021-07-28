//imports
const express = require('express');
const apiRouter = require('./apiRouter').router;
const path = require('path');
const helmet = require('helmet')
require('dotenv').config();


//instantiate server
const server = express();

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

let http = require('http');
let httpServer = http.Server(server);

let socketIO = require('socket.io');
let io = socketIO(httpServer);

server.use('/api/', apiRouter);
server.use('/images', express.static(path.join(__dirname, 'images')));

//launch server
httpServer.listen(8080, function(){
    console.log('Server en écoute :)');
})

io.on('connection', (socket) => {
    socket.on('join',(data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined')
    });
    socket.on('message', (data) => {
        io.in(data.room).emit('new message', {user:data.user, message: data.message});
    });
    socket.on('disconnect', (data) => {
        console.log('user disconnect');
    });
});
