
var ws = new WebSocket("ws://cs.tru.ca:8057/");  // should be ws:

ws.onopen = function() {  // Web Socket is connected, send messages using send()
    ws.send("{commmand:'join',username:'John',password:'abcd'}");
};

ws.onmessage = function (evt) {                       //when receive string message fro server
    var msgfromserver = JSON.parse(evt.data);         //evt.data is string from sever, convert string to object:msgfromserer is an object converted/parsed from string
    switch(msgfromserver.command) {
        case 'signed_in':
            ...
        case 'signed_out':
            ...
        case 'from':
            $('#output').append(msgfromserver.name + ': ' + msgfromserver.message + '<br>');       //append: jQuery method that is used to add new content
            ...
        case 'error':
            ...
    }
};

ws.onclose = function() {  // websocket is closed.
    alert('connection for socket is closed.');
};

ws.onerror = function(evt) { 
    alert('error happens with socket.');
};

$('#one_to_one').click(function() {   
    var msgtoserver = {};
    msgtoserver.command = 'one_to_one';
    msgtoserver.name = myname;
    msgtoserver.to = $('#receiver').text();
    msgtoserver.message = $('#message').text();
    ws.send(JSON.stringify(msgtoserver));               //convert object to string before send it to server. send query string to server as json format
});
