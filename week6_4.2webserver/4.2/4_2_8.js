
var url = require('url');
var tilde = require('tilde-expansion');
//????

function proceed_with_resolved_pathname(req, res, pathname) {
    if (pathname.endsWith("/"))
        pathname = pathname + "/index.html";
    //????
	var fs = require('fs');  // reference: Node.js File System Module
    if (extension == '.html' || extension == '.htm')
          content_type = 'text/html';
	  
    fs.readFile(pathname, 'utf8', function(err, content) {
       if (!err) {
          response.writeHead(200, {'Content-type': content_type});  // 200: OK; important
          response.write(content);
          response.end();
       }
       else {
        response.writeHead(404, {'Content-type': 'content_type'});  // 4xx: client error
        response.end("<html><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p><hr></body></html>");
       }
    });
	
	//-----
    res.writeHead(200, {"Content-Type": "text/html"});  // text/html, not text/plain, in this example
    res.write("<h1>Hello trial 5 World!</h1><br>");
    res.write(pathname + "<br>");
    res.end();
}

function route(request, response)
{
    var pathname = decodeURI(url.parse(request.url).pathname);
    var tilde = require('tilde-expansion');
    var words = pathname.split('/'); // word[0] is '' and word[1] is '~...' because pathname starts with '/'.
    if (words[1][0] == '~') {  // e.g., /~tom/...
        tilde(words[1], function(expanded) {  // Note that a callback function is used.
            var new_pathname = '/' + expanded + '/public_html';  // 'public_html' should be included.
            for (var i = 2; i < words.length; i++)
                new_pathname += '/' + words[i];
            proceed_with_resolved_pathname(request, response, new_password);
        });
    }
    else {
        var new_pathname = "/var/www/html" + pathname;
        proceed_with_resolved_pathname(request, response, new_password);
    }
}