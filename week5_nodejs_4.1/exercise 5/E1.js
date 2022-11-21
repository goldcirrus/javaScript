// hello_http.js
var http = require('http');  // Require 'http' module; We will study it in detail in the next section.

var server = http.createServer(function(req, res) {  // HTTP server object to deal with HTTP requests from clients
    res.writeHead(200, {"Content-type": "text/plain"});  // "text/plain" type
    res.write('<h1>Hello World!</h1>');
    res.end();
});

server.listen(8088);  // The server listens to the port number. Use your port number.
                            