let url = require('url');

function route(request, response) {
    var pathname = decodeURI(url.parse(request.url).pathname);
    var tilde = require('tilde-expansion');
    var words = pathname.split('/'); // word[0] is '' and word[1] is '~...' because pathname starts with '/'.
    if (words[1] != undefined && words[1][0] == '~') {  // e.g., /~tom/...
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

const proceed_with_resolved_pathname = function (req, res, pathname) 
{
console.log(pathname);
    var path = require('path');
    let fileordirname = path.basename(pathname);
    let words = fileordirname.split(".");
    let extension;
    if (words.length > 1) {
        extension = words[words.length - 1];
    } else {
        pathname = pathname + "/index.html";
        extension = 'html';
    }

    if (extension != 'sjs') {
        var content_type;
        if (extension == 'html') content_type = 'text/html';
        else if (extension == 'js') content_type = 'application/javascript';
        else if (extension == 'json') content_type = 'application/json';
        else if (extension == 'xml') content_type = 'application/xml';
        else if (extension == 'pdf') content_type = 'application/pdf';
        else if (extension == 'zip') content_type = 'application/zip';
        else if (extension == 'css') content_type = 'text/css';
        else if (extension == 'bmp') content_type = 'image/bmp';
        else if (extension == 'jpeg') content_type = 'image/jpeg';
        else if (extension == 'png') content_type = 'image/png';
        else content_type = 'text/plain';

        var fs = require('fs');
        if (extension == 'bmp' || extension == 'jpeg' || extension == 'png')
            fs.readFile(pathname, function(err, content) {
                if (!err) {
                    res.writeHead(200, {'Content-type': content_type});  // 200: OK; important
                    res.write(content);
                    res.end();
                }
                else {
                    res.writeHead(404, {'Content-type': 'text/html'});  // 4xx: client error
                    res.end("<html><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p><hr></body></html>");
                }
            });
        else
            fs.readFile(pathname, 'utf8', function(err, content) {
                if (!err) {
                    res.writeHead(200, {'Content-type': content_type});  // 200: OK; important
                    res.write(content);
                    res.end();
                }
                else {
                    res.writeHead(404, {'Content-type': 'text/html'});  // 4xx: client error
                    res.end("<html><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p><hr></body></html>");
                }
            });
    }
    else
        require('./proceed_sjs.js').start(req, res, pathname);
}

exports.route = route;
