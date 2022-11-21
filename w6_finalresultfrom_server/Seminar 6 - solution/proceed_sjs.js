const start = function (req, res, pathname) {
    let url = require('url');
    let querystring = require('querystring');
	
    if (req.method.toLowerCase() == 'get') {
        var _GET = querystring.parse(decodeURI(url.parse(req.url).query))
        proceed(req, res, _GET, {}, pathname);
    }
    else if (req.method.toLowerCase() == 'post') {
        var query = '';
        req.on('data', function(chunk) {  // request is an Event Emitter.
            query += chunk;
        });
        req.on('end', function() {  // the end of the data
            var _POST = querystring.parse(query);
            proceed(req, res, {}, _POST, pathname);
/*
            if (query != '')
                ...  // parsing using 'querystring' module. Check the example in the 'GET' case.
*/
        });
    }
}

const proceed = function(req, res, _GET, _POST, pathname) {
    try {
        var sjs = require(pathname);
        sjs.proceed(_GET, _POST, function(content) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(content);
            res.end();
            delete require.cache[require.resolve(pathname)];
        });
    }
    catch(e) {
        res.writeHead(500, {'Content-type': 'text/html'});
        res.write("<html><body><h1>Error Found</h1><p>The requested URL has an error or errors.</p><hr></body></html>");
        res.end();

        delete require.cache[require.resolve(pathname)];
    }
}

exports.start = start;
