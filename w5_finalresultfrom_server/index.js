var server = require('./server');
var router = require('./router_file');

server.start(router);
