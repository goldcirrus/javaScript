if (request.method.toLowerCase() == "get")
    ...
else if (request.??? == '???')
    ...

/*
decodeURI(url.parse(request.url).pathname) → '/start.html'
decodeURI(url.parse(request.url).query) → 'foo=bar&hello=world'
querystring.parse(decodeURI(url.parse(request.url).query)) → { foo: 'bar', hello: 'world' }
querystring.parse(decodeURI(url.parse(request.url).query))['foo'] → 'bar'
querystring.parse(decodeURI(url.parse(request.url).query))['hello'] → 'world'
How to convert an associative array to a string?    JSON.stringfy()

Let's put the GET query into a variable named _GET
*/