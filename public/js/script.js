var socket = io();

socket.on('connect', function () {
    console.log("Connected to the server")
});

socket.on('disconnect', function () {
    console.log("disconnected")
});
socket.on('newMsg', function (msg) {
    console.log(msg);
    var li = jQuery("<li></li>");
    li.text(`${msg.from}: ${msg.text}`);
    jQuery("#msgs").append(li);
});

jQuery("#msg-form").on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMsg', {
        from: 'User',
        text: jQuery('[name=msg]').val()
    }, function () {
        jQuery('[name=msg]').val() = '';
    })
})