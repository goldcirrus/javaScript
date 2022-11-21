if (request.method.toLowerCase() == "get")
    ...
else if (request.method.toLowerCase() == 'post')
    ...


querystring.parse(decodeURI(url.parse(request.url).query)) → { foo: 'bar', hello: 'world' }

var query = '';
request.on('data', function(chunk) {  // request is an Event Emitter.
    query += chunk;
});
request.on('end', function() {  // the end of the data
    if (query != '')
        ...  // parsing using 'querystring' module.
});