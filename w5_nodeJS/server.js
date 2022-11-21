  //   server.js
var PORT_NO = 8057;
var http = require('http');

function start(r) {
    var server = http.createServer(
        function(request, response) {  // request: from the client; response: to the client
            r.route(request, response);
        }
    );
    server.listen(PORT_NO);
}

exports.start = start;



