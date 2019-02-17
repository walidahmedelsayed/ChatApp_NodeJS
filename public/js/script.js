var socket = io();

socket.on('connect', function () {
    console.log("Connected to the server")

    socket.emit('createMsg', { from: "walid", text: "Hello World!" })
});

socket.on('disconnect', function () {
    console.log("disconnected")
});
socket.on('newMsg', function (msg) {
    console.log(msg)
});
