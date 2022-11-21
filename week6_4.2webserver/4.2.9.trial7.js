var query = '';

request.on('data', function(chunk) {  // request is an Event Emitter, to register an event 'data'
    query += chunk;
});

request.on('end', function() {  // to register an event:'end' of the data
    if (query != '')
        ...  // parsing using 'querystring' module. Check the example in the 'GET' case.
});

//trigger events:
request.emit('data','abc');
request.emit('end');


var events = require('events');
var eventEmitter = new events.EventEmitter();
//register an event:'doorOpen'
eventEmitter.on('doorOpen', function(x){console.log("do something with "+x);});
//triger event:'doorOpen'
eventEmitter.emit('doorOpen', dataX);

