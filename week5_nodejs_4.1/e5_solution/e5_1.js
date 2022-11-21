// hello_http.js
var http = require('http');  // Require 'http' module; We will study it in detail in the next section.
var server = http.createServer(function(req, res) {  // HTTP server object to deal with HTTP requests from clients
    res.writeHead(200, {"Content-type": "text/plain"});  // "text/plain" type
    res.write('<h1>Hello World!</h1>');
    res.end();
});

server.listen(8088);  // The server listens to the port number. Use your port number.
                          
/*
Trial E1: Let's try to improve hello_http.js in 4.1.9.
We will pass {"Content-type": "text/plain"} to .writeHead() as the second argument. 
It is used to say to HTTP what kind of data is sent.
We will add .write('<h1>Hello World!</h1>') after .writeHead().
.end() for compliting the HTTP channel.
*/