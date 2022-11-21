var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {     //pass in request(cs.tru.ca:8057/summer.html) and response objects
  var q = url.parse(req.url, true);       
  var filename = "." + q.pathname;          //pathname is /summer.html add . --> ./summer.html in the current directory

  fs.readFile(filename, function(err, data) {
    if (err) {                                                //if file is not exist
      res.writeHead(404, {'Content-Type': 'text/html'});
	  res.write('error 404! Page not found.');
      return res.end("404 Not Found");
    }
	
	else{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('data is: '+data);                             //data is the content in the file
    res.write('pathname is: 'q.pathname);
    return res.end();
	}
  });
}).listen(8057);


//in same folder there is the summer.html file. 
//client in his browser type-->  cs.tru.ca:8057/summer.html
