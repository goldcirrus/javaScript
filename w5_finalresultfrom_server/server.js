// server.js file: this file is where the server moduel defined. 

var PORT_NO = 8057;
var http = require('http');

function start(r) {                     
    var server = http.createServer(function(request, response) {                    // callbac_def的 request is an object from the client; response is an object to the client
                r.route(request,response);                                         //createServer(callback_def); 的callback_def通过自己的parameter:response得到server要显示的数据
        }
    );  //end of createServer(); invokation. 
	
    server.listen(PORT_NO);
}

exports.start = start;
