Trial E1: Let's get the GET data.
In test_router.js,

Here are examples for the URI of 'http://test.com/start.html?command=Login&username=foo&password=topsecret'

decodeURI(url.parse(request.url).pathname) → '/start.html'
decodeURI(url.parse(request.url).query) → 'command=Login&username=foor&password=topsecret'

var _GET = querystring.parse(decodeURI(url.parse(request.url).query)) 
                                                                     → { command:'Login', username:'foo', password:'topsecret' }
_GET['command'] → 'Login'


// for testing
var queryinURL = "op=addition&x=10&y=20";

// Node WebServer
var querystring = require('querystring');       // require the module
var _GET = querystring.parse(queryinURL);      // .parse can seperate query string to an object with each part listed 
console.log("_GET: ", _GET);



//in server to test the above file.
node test_router.js

//output is
_GET:  [Object: null prototype] { op: 'addition', x: '10', y: '20' }


//How to convert an associative array to a string?    JSON.stringfy()