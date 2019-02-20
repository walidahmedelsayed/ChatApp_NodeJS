const path = require("path");
const publicPath = path.join(__dirname, "../public");
const express = require("express");
const socketIO = require('socket.io');
const http = require("http");
var { generateMsg } = require('../utils/message');
var { isRealString } = require('../utils/validation');
const { Users } = require('../utils/users');
var app = express();
var PORT = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Display Name & Room Name are required");
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        socket.emit('newMsg', generateMsg('Walid', 'Welcome to my ChatApp..'));
        socket.broadcast.to(params.room).emit('newMsg', generateMsg('Admin', `${params.name} joined the room`));
        callback();
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
    });

    socket.on("disconnect", function () {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMsg', generateMsg('Admin', `${user.name} left the room`));
        }
    });
});



server.listen(PORT, () => {
    console.log("Server is up and running on " + PORT);
})