var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var server = app.listen(8058, function () {
        console.log(`Example app listening on port 8058`)
})



// To support CORS
app.all('/*', function(req, res, next) {  // /*: any routes
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");  // Default: only GET and POST
    next();  // Express middleware function; To continue to next operations
});


// trial3, GET method route; what is a router here?  
//How to check parameters? E.g., .../tokens/1 and .../tokens/1,2. Let's req.params.id. 
app.get('/tokens/:id', (req, res) => {
  res.send('GET: /tokens; id=' + req.params.id);
})

// for POST query
app.use(bodyParser.urlencoded({ extended: true }));

// POST method route
app.post('/tokens/:id', (req, res) => {
  res.send('POST: /tokens; id=' + req.params.id);
})

// Route operations
app.post('/users', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var msg = {op: "SignIn", username: username, password: password};
    res.send(JSON.stringify(msg));     //convert object to string
});


// Route operations
app.post('/messages', function(req, res) {
    var receiver = req.body.receiver;   //string
    var sender = req.body.sender;        //string
    var message = req.body.message;      //string
    var msg = {op:"SaveMessage", sender:sender, receiver:receiver, message:message};
    res.send(JSON.stringify(msg));  // send msg, convert msg from object to string
});

