
var url = require('url');
var tilde = require('tilde-expansion');



function proceed_with_resolved_pathname(req, res, pathname) {
    if (pathname.endsWith("/"))
        pathname = pathname + "/index.html";
    //????
	//----test pathname's last part has .extension or not-->without .extension is a directory
    const path = require("path");
    let fileordirname = path.basename(pathname);    //last part of pathname
    let words = fileordirname.split(".");
    let extension;
    if (words.length > 1) {                         //.extension exists
          extension = words[words.length - 1];     //extension is the last element in words
    } 
	else {                     //If there is no file extension, we assume basename is a directory, and '/index.html' is attached. See 4.2.4
          pathname = pathname + '/index.html';
          extension = 'html';
    }
	
	//----
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
            proceed_with_resolved_pathname(request, response, new_pathname);
        });
    }
    else {
        var new_pathname = "/var/www/html" + pathname;
        proceed_with_resolved_pathname(request, response, new_pathname);
    }
}

