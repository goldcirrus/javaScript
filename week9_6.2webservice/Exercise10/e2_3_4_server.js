
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var server = app.listen(8058, function () {
	console.log(`Example app listening on port ${port}`)
})

// for POST query
app.use(bodyParser.urlencoded({ extended: true }));

// To support CORS
app.all('/*', function(req, res, next) {  // /*: any routes
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");  // Default: only GET and POST
    next();  // Express middleware function; To continue to next operations
});



//server Route operations for e2 that will process SignIn. The server program will send a JSON string.
app.post('/users', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var msg = {op: "SignIn", username: username, password: password};
    res.send(JSON.stringify(msg));
});

// Route operations for e3 that will process SaveMessage. The server program will send a JSON string. 
app.post('/messages', function(req, res) {
    var receiver = req.body.receiver;
    var sender = req.body.sender;
    var message = req.body.message;
    var msg = {op:"SaveMessage", sender:sender, receiver:receiver, message:message};
    res.send(JSON.stringify(msg));  // send msg
});

// Route operations for e4 that will process DeleteMessageWithId. The server program will send a JSON string.
app.delete('/messages/:id', function(req, res) {
    var id = req.params.id;
    var msg = {op:"DeleteMessageWithId", id:id};
    res.send(JSON.stringify(msg));
});