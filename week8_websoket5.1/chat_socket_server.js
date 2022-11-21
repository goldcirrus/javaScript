
var WebSocketServer = require('ws').Server,
    ws_server = new WebSocketServer({port: 8057});

var ws_clients = {};    //store all signed in users/client objects
    
ws_server.on('connection', function(ws_client) {  // ws_client is an WebSocket object, i.e., a socket for clients.
    
	ws_client.on('message', function(message) {
		//message=String(message);
        msgfromclient = JSON.parse(message);       //msgfromclient is parsed to an object
        switch(msgfromclient.command) {
            case 'join':
                ...
                break;
            case 'sign_in':
                ...
                ws_clients[msgfromclient.name] = ws_client;
                ...
                break;
            case 'sign_out':
                ...
                ??? ws_clients[msgfromclient.name];  // delete the corresponding ws_client
                ...
               break;
            case 'one_to_one':
                // find the ws_client for msgfromclient.to, and send msgfromclient.message to the ws_client
                ws_clients[msgfromclient.name].send(msgfromclient.message);
                break;
            case 'broadcasting':
                ws_server.clients.forEach(function(client){
			           if(client.readyState==WebSocket.OPEN)
				              client.send('a client is closed.');
		        });                      // broadcasting it
 
                break;
            
        }
    });
	
    ws_client.on('close', function(code) {
		ws_server.clients.forEach(function(client){
			if(client.readyState==WebSocket.OPEN)
				client.send('a client is closed.');
		});                      // broadcasting it
        
		ws_client.close();     // find the socket from ws_clients and delete it
    });
	
    ws_client.on('error', function(err) {
        ws_server.clients.forEach(function(client){
			if(client.readyState==WebSocket.OPEN)
				client.send('a client is closed.');
		});                       // broadcasting it
        
		ws_client.close();     // find the socket from ws_clients and delete it
    });
});