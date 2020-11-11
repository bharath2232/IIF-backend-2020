const express = require('express');
const socketio = require('socket.io')
const http = require('http');
const app = express();
const server = http.createServer(app);


module.exports = (app,io) => { 

io.on("connection", (socket) => {
     console.log("We are connected");
    socket.on("join",({user, train}) => {
        
    })
})


}

