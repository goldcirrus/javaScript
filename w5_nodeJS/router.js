//router_file.js
var url = require('url');


//read a file pointed by the pathname. 
var fs=require('fs');

function proceed_with_filereading(request, response, pathname) {
    fs.readFile(pathname, 'utf8', function(err, content) {
        if (!err) {                     //if err is 'none', display content  (none is false)
            console.log(content);
		    response.writeHead(200,{"Content-Type":"text/html"});
			response.write(content);
			response.end();
        }
        else {                           //else if err is not 'none', display err. 
            console.log(err);
			response.writeHead(200,{"Content-Type":"text/html"});
			response.write("404 page not found. "+err);
			response.end();
        }
    });  //end of invoking: fs.readFile(pathname,'utf8',callback_definition);   //callback_definition gets data from file pointed by pathname
}

function proceed_with_resolved_pathname(req, res, pathname) {
    console.log('req.url is: '+req.url);
    res.writeHead(200, {"Content-Type": "text/html"});  // text/html, not text/plain, in this example
    res.write("<h1>Hello with pathname example  World!</h1><br>");
    res.write(pathname + "<br>");
    res.end();
}

function route(request, response)
{
    var pathname = decodeURI(url.parse(request.url).pathname);  //pathname is whatever after host:8057== /~lzhong/abc.html
    var tilde = require('tilde-expansion');
    var words = pathname.split('/'); // word[0] is '' and word[1] is '~lzhong' because pathname starts with '/'.
    if (words[1][0] == '~') {  // e.g., word[1]== '~lzhong'
        tilde(words[1], function(expanded) {  // Note that a callback function is used. tilde()pass real data to expanded parameter
            console.log('expand is: '+expanded);
            var new_pathname = '/' + expanded + '/public_html';  // 'public_html' should be included. /expanded_from_root_to/lzhong/public_html
            for (var i = 2; i < words.length; i++)               //add address whatever following ~lzhong/....
                new_pathname += '/' + words[i];
            proceed_with_resolved_pathname(request, response, new_pathname);
			proceed_with_filereading(request,response,new_pathname);
        });
        //????  // really necessary?
    }
    else {
        var new_pathname = "/var/www/html" + pathname;
        proceed_with_resolved_pathname(request, response, new_pathname);
		proceed_with_filereading(request,response,new_pathname);
    }
}

exports.route=route;

