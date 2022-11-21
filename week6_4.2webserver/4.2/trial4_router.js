var url = require('url');

function proceed_with_resolved_pathname(req, res, pathname) {
    //????
    res.writeHead(200, {"Content-Type": "text/html"});  // text/html, not text/plain, in this example
    res.write("<h1>Hello with pathname example  World!</h1><br>");
    res.write(pathname + "<br>");
    res.end();
}

                 //object of request and object of response are passed to function route()
function route(request, response)                   
{                                      //request.url is the address user entered in his browser to request to the server
    var pathname = decodeURI(url.parse(request.url).pathname);  //pathname is whatever after host:8057== /~lzhong/abc.html
    var tilde = require('tilde-expansion');
    var words = pathname.split('/'); // word[0] is '' and word[1] is '~lzhong' because pathname starts with '/'.
    if (words[1][0] == '~') {  // e.g., word[1]== '~lzhong'
        tilde(words[1], function(expanded) {  // Note that a callback function is used. tilde()pass real data to expanded parameter
            var new_pathname = '/' + expanded + '/public_html';  // 'public_html' should be included. /expanded_from_root_to/lzhong/public_html
            for (var i = 2; i < words.length; i++)               //add address whatever following ~lzhong/....
                new_pathname += '/' + words[i];
            proceed_with_resolved_pathname(request, response, new_pathname);
        });
        //????  // really necessary?
    }
    else {
        var new_pathname = "/var/www/html" + pathname;
        proceed_with_resolved_pathname(request, response, new_pathname);
    }
}

exports.route=route;