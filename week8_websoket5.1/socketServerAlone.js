// Example of standalone WebSocket echo server with the port number 8857
//first to install ws in the current directory
//npm install ws

var WebSocketServer = require('ws').Server;
    ws_server = new WebSocketServer({port: 8057});      //ws_server is not declared, so it is a global variable
    
ws_server.on('connection', function(ws_client, request) {  // ws_client is an WebSocket object, i.e., a socket for clients.
    //ws_client.send(request.url);      //just for test
    
    ws_client.on('message', function(msg) {
        msg = String(msg);                          //msg is a object: <Buffer 66 66>, so we must convert this object to string, 
        ws_client.send(msg);                         //then send this string back to client
        if (msg == 'end')                          // 'end' is an application level message.
            ws_client.close();
    });
	
    ws_client.on('close', function(code) {
        console.log(code);
        ws_client.close();
    });
	
    ws_client.on('error', function(err) {
        console.log(err);
        ws_client.close();
    });
});


//npm install ws