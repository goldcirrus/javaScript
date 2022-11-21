// server2.js file: this file is where the model defined. server和router在同一个文件
var PORT_NO = 8057;
var http = require('http');

function start() {
    var server = http.createServer(function(request, response) {  // callbac_def的 request: from the client; response: to the client
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write("<h1>Hello World!</h1>");
            response.end();    //createServer(callback_def); 的callback_def通过自己的parameter:response得到server要显示的数据
        }
    );  //end of createServer(); invokation. 
	
    server.listen(PORT_NO);
}

exports.startServer = start;
//父方程createServer(callback_def); 被invoke. 
//父方程createServer(callback_def); 的callback_def=function(request,response){.....} parameter:response获取实际数据，传送回父方程：createServer();




//index2.js file is the main file executed by node.
var server = require('./server2');        // server2.js; the variable server represents all the exported functions in server2.js
server.startServer();                     // .start() is an exported function that is defined in server2.js.


//start to run the server，check page at cs.tru.ca:8057
node index2.js