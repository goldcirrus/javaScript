

var queryinURL = "op=addition&x=10&y=20";

var querystring = require('querystring');
var _GET = querystring.parse(queryinURL);     //_GET is a global variable; querystring.parse return an object
console.log("_GET: ",_GET);        //_GET:  [Object: null prototype] { op: 'addition', x: '10', y: '20' }


var events = require('events');                   //To include the built-in Events module
var req = new events.EventEmitter();            //create an EventEmitter object(req)

// Node WebServer
var query = "";
req.on('data', function(chunk) {                 //Assign the event handler:anonymous function to an event:'data':
    query+=chunk;  // add chunk to query
});

var _POST = {};     //_POST is a global variable
req.on('end', function() {
    var querystring = require('querystring');
        if (query != '')
        _POST = querystring.parse(query);
    console.log("_POST: ", _POST);                  //_POST:  [Object: null prototype] { op: 'addition', x: '10', y: '20' }
	
    let pathname = './test_addition.sjs';        //tell where to find module:test_addition.sjs  ./ should be included to say the file exists under the current working directory.
    proceed_sjs(_GET,_POST, pathname);  // output result message: 30, function definition is in fil:trial3_test_addition.sjs
});

// for testing to fire the events: 'data' and 'end'
req.emit('data', queryinURL);       //Fire the 'data' event, and pass in the argument:(queryinURL) to callback(chunk)
req.emit('end');    //Fire the 'end' event, and invoke proceed_sjs() function.



// This function is invoked after _GET or _POST is obtained.
function proceed_sjs(_GET, _POST, pathname) {
    try{
	var sjs = require(pathname);
    sjs.proceed(_GET,_POST,function(message) {
        console.log(message);            //message is the result of calculation of addition
    });
	}catch(err){
		consol.log("Internal error",err);
	}
}
