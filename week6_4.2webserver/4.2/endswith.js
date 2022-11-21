//trial5
//Trial 5. Let's try to update router.js to include the above code and test it with different URLs. E.g., cs.tru.ca:8080, 
//cs.tru.ca:8080/test.html, cs.tru.ca/~youraccount/test.sjs. You need to send out the file extension to the client.

var url = require('url');
var tilde = require('tilde-expansion');
????

function route(request, response)
{
    var pathname = decodeURI(url.parse(request.url).pathname);
    var tilde = require('tilde-expansion');
    var words = pathname.split('/'); // word[0] is '' and word[1] is '~...' because pathname starts with '/'.
    if (words[1][0] == '~') {  // e.g., /~tom/...
        tilde(words[1], function(expanded) {  // Note that a callback function is used.
            var new_pathname = '/' + expanded + '/???';  // 'public_html' should be included.
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

function proceed_with_resolved_pathname(req, res, pathname) {
    if (pathname.endsWith("/"))
        pathname = pathname + "/index.html";
    ????
    res.writeHead(200, {"Content-Type": "text/html"});  // text/html, not text/plain, in this example
    res.write("<h1>Hello  World!</h1><br>");
    res.write(??? + "<br>");
    res.end();
}