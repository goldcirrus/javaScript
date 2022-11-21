var PORT_NO = 8058;

function start(router) 
{
    // HTTP server
    
    var http = require('http');
    var http_server = http.createServer(
        function(request, response) {
            router.route(request, response);
        }
    );
    http_server.listen(PORT_NO);
    
    // WebSocket server
/*    
    const WebSocketServer = require('ws').Server;
    const ws_server = new WebSocketServer({server: http_server});  // different from the standalone version
        
    ws_server.on('headers', function(headers) {  // The object of HTTP headers
        ;
    });

    ws_server.on('connection', function(ws_client, request, client) 
    {
        const ws_router = require('./ws_router.js');
        ws_router.route(ws_client, request, client);
    });
*/
}


exports.start = start;
