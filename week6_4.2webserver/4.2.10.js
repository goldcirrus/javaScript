//---- TRUWSJS ----
var sjs = require(pathname);  // 'pathname' is a sjs script file. This file is required as a 自定义module. For example, pathname==test.sjs.
                          // We assume that all '.sjs' programs have the function, proceed(), 
                          //   that is the starting point like main() in Java and C/C++ programs.
                          // _GET: object for the GET query; _POST: object for the POST query
                          //   For example, { command:'Login', username:'foo', password:'topsecret' }
						  
sjs.proceed(_GET, _POST, function(content) {  // callback function to get the result from the sjs program
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(content);
    response.end();
});



//---- test.sjs 自定义module file ----
function proceed(_GET, _POST, callback) {
    var content;
    if (_GET['command'] == 'Login')  // For example 1
        ...
    // For example 2
	for (var x in _GET)        //x is key in array _GET
        content += x + '=' + _GET[x] + '<br>';
		
    callback(content);
}

exports.proceed = proceed;