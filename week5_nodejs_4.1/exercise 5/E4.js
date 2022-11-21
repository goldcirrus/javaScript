// index.js   主索引文件使用的module function是 exports.func_name. 
module = require('hello_http.js');
module.startp();

// --hello_http.js-- the module file
var http = require('http');

function start(){    //自定义module的function name不重要
    var server = http.createServer(function(req,res) {          //父方程中的数据（objects),被传递给anonymous callback,通过callback的parameters:reg,res
            res.writeHead(200,{'Content-type':'text/html'});
            res.write('<h1>from server say hello world to you</h1>');
            res.end('the message is end here to you');
        });
		
    server.listen(8057);
}

exports.startp = start;  //主索引文件使用的module function是 exports.func_name. 

//index.js open html server at cs.tru.ca:8057

//below is teacher's solution************************************************************
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
                          
