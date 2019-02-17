const path = require("path");
const publicPath = path.join(__dirname, "../public");
const express = require("express");
const socketIO = require('socket.io');
const http = require("http");
var app = express();
var PORT = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New User Connected")
    socket.emit('newMsg', {
        from: "Admin",
        text: "Welcome to the Chat App",
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit('newMsg', {
        from: "admin",
        text: "New user connected",
        createdAt: new Date().getTime()
    })
    socket.on("disconnect", function () {
        console.log("Disconnected ....")
    });

    socket.on("createMsg", function (msg) {
        console.log(msg)
        io.emit('newMsg', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        })
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