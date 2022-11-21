Trial E2: Let's get the POST data.
In test_router.js,
// for testing, trial7
var queryinURL = "op=addition&x=10&y=20";
var events = require('events');                   //To include the built-in Events module
var req = new events.EventEmitter();            //create an EventEmitter object(req)

// Node WebServer
var query = "";
req.on('data', function(chunk) {                 //Assign the event handler:anonymous function to an event:'data':
    query+=chunk;  // add chunk to query
});

var _POST = {};
req.on('end', function() {
    var querystring = require('querystring');
	if (query != '')
        _POST = querystring.parse(query);
    console.log("_POST: ", _POST);
    // proceed_sjs({}, _POST, pathname);  // In Trial E3
});

// for testing
req.emit('data', queryinURL);       //Fire the 'data' event, and pass in the argument:(queryinURL) to callback(chunk)
req.emit('end');


https://www.sitepoint.com/nodejs-events-and-eventemitter/