//trial 6
//send file back to client  Here is an example of '.html' file in router.js

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
        response.writeHead(404, {'Content-type': content_type'});  // 4xx: client error
        response.end("<html><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p><hr></body></html>");
    }
});