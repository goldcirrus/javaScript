let url = require('url');

function route(request, response) {
    var pathname = decodeURI(url.parse(request.url).pathname);
        var queryname = decodeURI(url.parse(request.url).query);

    var tilde = require('tilde-expansion');
    var words = pathname.split('/'); // word[0] is '' and word[1] is '~...' because pathname starts with '/'.
    if (words[1] != undefined && words[1][0] == '~') {  // e.g., /~tom/...
        tilde(words[1], function(expanded) {  // Note that a callback function is used.
            var new_pathname = '/' + expanded + '/public_html';  // 'public_html' should be included.
            for (var i = 2; i < words.length; i++)
                new_pathname += '/' + words[i];
            proceed_with_resolved_pathname(request, response, new_pathname,queryname);
        });
    }
    else {
        var new_pathname = "/var/www/html" + pathname;
        proceed_with_resolved_pathname(request, response, new_pathname);
    }
}

const proceed_with_resolved_pathname = function (req, res, pathname, queryname) {
    var fs = require('fs');
    var content_type = 'text/html';
                    //here read the .html file from pathname
    fs.readFile(pathname, 'utf8', function(err, content) {
        if (!err) {
            res.writeHead(200, {'Content-type': content_type});  // 200: OK; important
            res.write(content);
            res.write('new_pathname is :'+pathname);
            res.write('query name is :'+queryname);
            res.end();
        }
        else {
            res.writeHead(404, {'Content-type': content_type});  // 4xx: client error
            res.end("<html><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p><hr></body></html>");
        }
    });
}

exports.route = route;
