
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



// Route operations
app.delete('/messages/:id', function(req, res) {
    var id = req.params.id;
    var msg = {op:"DeleteMessageWithId", id:id};
    res.send(JSON.stringify(msg));
});