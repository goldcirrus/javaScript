
const WebSocketServer = require('ws').Server; // WebSocket server integrated with Seminar5

const ws_server = new WebSocketServer({port:8057});  // standalone version
    
ws_server.on('headers', function(headers) {  // The object of HTTP headers
    ;
});
    
ws_server.on('connection', function(ws_client, request) {
	
    ws_client.on('message', function(message) {  //message from client is already a JSON string
		//message=String(message);  
		console.log(message);
        message = JSON.parse(message);  // convert message (JSON string) to an object
                                        // {op:..., x:..., y:...}
        let rtnmsg = {};
		
        if (message.op == 'addition') {
            rtnmsg.op = 'addition';
            rtnmsg.result = Number(message.x) + Number(message.y);
            ws_client.send(JSON.stringify(rtnmsg));   //renmsg = {op:'addition',result=25}
			rtnmsg = {};                              //reset rtnmsg
        }	
		
		else if (message.op == 'subtraction') {
            rtnmsg.op = 'subtraction';
            rtnmsg.result = Number(message.x) - Number(message.y);
            ws_client.send(JSON.stringify(rtnmsg));
			rtnmsg = {};
        }	
		
		else if (message.op == 'multiplication') {
            rtnmsg.op = 'multiplication';
            rtnmsg.result = Number(message.x) * Number(message.y);
            ws_client.send(JSON.stringify(rtnmsg));
			rtnmsg = {};
        }	
		
		else if (message.op == 'division') {
            rtnmsg.op = 'division';
            rtnmsg.result = Number(message.x) / Number(message.y);
            ws_client.send(JSON.stringify(rtnmsg));
			rtnmsg = {};
        }	
        
    });
        
    ws_client.on('close', function(message) {
        console.log('closed');
		ws_client.close();
    });
	
});
