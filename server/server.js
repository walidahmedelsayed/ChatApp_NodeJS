const path = require("path");
const publicPath = path.join(__dirname, "../public");
const express = require("express");
const socketIO = require('socket.io');
const http = require("http");
var { generateMsg } = require('../utils/message');
var app = express();
var PORT = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New User Connected")
    socket.emit('newMsg', generateMsg('admin', 'Welcome to the chat app..'));
    socket.broadcast.emit('newMsg', generateMsg('admin', 'New user connected'));
    socket.on("disconnect", function () {
        console.log("Disconnected ....")
    });

    socket.on("createMsg", function (msg, callback) {
        console.log(msg)
        io.emit('newMsg', generateMsg(msg.from, msg.text));
        callback();
        // socket.broadcast.emit('newMsg', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // })
    })
});



server.listen(PORT, () => {
    console.log("Server is up and running on " + PORT);
})