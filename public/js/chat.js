var socket = io();

socket.on('connect', function () {
    console.log("Connected to the server")
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, (err) => {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log("No Error");
        }

    });
});

socket.on('updateUsersList', function (users) {
    var ol = jQuery('<ol></ol>');
    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
})

socket.on('disconnect', function () {
    console.log("disconnected")
});

function scrollToLastMsg() {
    var msgs = jQuery('#msgs');
    var newMsg = msgs.children('li:last-child');

    var clientHeight = msgs.prop('clientHeight');
    var scrollHeight = msgs.prop('scrollHeight');
    var scrollTopHeight = msgs.prop('scrollTop');
    var newMsgHeight = newMsg.innerHeight();
    var lastMsgHeight = newMsg.prev().innerHeight();

    if (clientHeight + scrollTopHeight + newMsgHeight + lastMsgHeight >= scrollHeight) {
        msgs.scrollTop(scrollHeight);
    }
}


socket.on('newMsg', function (msg) {
    var formatedTime = moment(msg.createdAt).format('h:mm:ss a');
    var template = jQuery('#msg-template').html();
    var html = Mustache.render(template, {
        from: msg.from,
        text: msg.text,
        createdAt: formatedTime
    });
    jQuery('#msgs').append(html);
    scrollToLastMsg();
    // var formatedTime = moment(msg.createdAt).format('h:mm a');
    // var li = jQuery("<li></li>");
    // li.text(`${msg.from} ${formatedTime}: ${msg.text}`);
    // jQuery("#msgs").append(li);
});
var msgBox = jQuery('[name=msg]');
jQuery("#msg-form").on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMsg', {
        from: 'User',
        text: msgBox.val()
    }, function () {
        msgBox.val('');
    })
})