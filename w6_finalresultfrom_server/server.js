// server.js file: this file is where the server moduel defined.

var PORT_NO = 8057;
var http = require('http');

function start(r) {
    var server = http.createServer(function(request, response) {                    // callbac_de
                r.route(request,response);                                         //createServer
        }
    );  //end of createServer(); invokation.

    server.listen(PORT_NO);
}

exports.start = start;
