// WebSocket server integrated with TRUWSJS that uses the port number 8857

// HTTP server

const HTTP_PORT_NO = 8057;
const http = require('http');

const http_server = http.createServer(function(request, response) {
    ;
});
http_server.listen(HTTP_PORT_NO);


// WebSocket server

const WebSocketServer = require('ws').Server; // WebSocket server integrated with a web server
const ws_server = new WebSocketServer({server: http_server});  // different from the standalone version

ws_server.on('headers', function(headers) {  // The object of HTTP headers
    ;
});

ws_server.on('connection', function(ws_client, request)
{
    //ws_client.send(request.url);

    ws_client.on('message', function(msg) {
        msg = String(msg);
        if (msg == 'end' || msg == 'close' || msg == 'quit') {
            ws_client.close();
        } else {
            ws_client.send(msg);  // echoing
        }
    });

    ws_client.on('close', function(msg) {
        console.log('closed');
    });
});



//https://www.npmjs.com/package/nodejs-websocket
//https://github.com/websockets/ws
//https://github.com/socketio/socket.io