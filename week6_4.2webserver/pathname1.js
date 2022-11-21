var url = require("url");  // reference: Node.js URL Module

function route(request, response) {
     var pathname = decodeURI(url.parse(request.url).pathname);  // decodeURI(): a JS built-in function
//or var pathname = url.parse(request.url,true).pathname;        //request.url is request's address
                                                                 //pathname is '/....' following the host:port#/......
    
    response.writeHead(200, {"Content-Type": "text/html"});  // text/html, not text/plain, in this example
    response.write("<h1>Hello  World!</h1><br>");
    response.write(pathname + "<br>");
    response.end();
}

exports.route = route;