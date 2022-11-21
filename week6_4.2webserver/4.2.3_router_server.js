//router.js
function route(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});  // Plain text, not html text, will be sent back to the client
    response.write("<h1>Hello World!</h1>");
    response.end();
}
exports.route = route;

//server.js
var PORT_NO = 8057;
var http = require('http');

function start(r) {
    var server = http.createServer(
        function(request, response) {          // .createServer() pass real objects(request: an object from the client; response: an object send to the client) to its anonymous callback function's definition
            r.route(request, response);        //r is a module passed to start(r) when start(r) is invoked in index.js
        }                                      //r.route(request, response) is module r's method: function route(request,response)
    );
    server.listen(PORT_NO);
}
exports.start = start;

//index.js
var server = require('./server');
var router = require('./router');
server.start(router);         //将route的定义，作为argument传送给server的start()方程,位置却在server.js文件中，方程start()的定义里

/*1. server is a module from require('./server');
  2. server.start(router);  to invoke function start(r);
  3. router is a module from require('./router');
*/
//to start the server:
node index.js

/*
1. ser
*/