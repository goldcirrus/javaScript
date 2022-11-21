// index.js
http = require("./hello_http");
http.start();

// hello_http.js
var http = require('http');
function start() {
    var server = http.createServer(function(req, res) {
        res.writeHead(200, {"Content-type": "text/html"});
        res.write('<h1>Hello World!</h1>');
        res.end();
    });
    server.listen(8088);
}
exports.start = start;
                          
						  
/*
Trial E4: Following E2, can you change hello_http.js to a module?
Here is another file, index.js. This file requires hello_http.js as a module and uses it as folloing.
*/