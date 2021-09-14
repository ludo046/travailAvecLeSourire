//imports
const express = require('express');
const apiRouter = require('./apiRouter').router;
const path = require('path');
const helmet = require('helmet')
const fs = require('fs')
require('dotenv').config();
const db = require("./models");
db.sequelize.sync();
//db.sequelize.sync({force: true});
require('dotenv').config();


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

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('my message', (msg) => {
        io.emit('my broadcast', ({msg}))
    })
    socket.on('room message', (msg) => {
        io.emit('message room', ({msg}))
    })
    socket.on('image', (image, buffer) => {
        fs.readFile(__dirname + '/images/image.jpg', (err, buf) => {
            socket.emit('image', {image: true, buffer: buf});
            console.log('image file is initialized');
        })
    })
    socket.on('disconnect', () => {
        console.log('user diconnected');
    })
    // socket.on('my message',(msg) => {
    //     console.log('message: ' + msg);
    // })
})

