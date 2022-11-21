var express = require('express');
var bodyParser = require('body-parser');
var model = require('./model.js');

var app = express();

var server = app.listen(8058, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s", host, port)
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

app.get('/', function (req, res) {  // HTTP GET method
    res.send("Welcome to TRU MongoDB Web Service!");
})

// SignUp
//   client send Request by post query- POST /users?username=...&password=...
//   Response - '{"result":"true"|"false", "explanation":"..."}'
app.post('/users', function (req, res) {  // HTTP POST method
    var username = req.body.username;
    var password = req.body.password;
    console.log("username = %s, password = %s", username, password);
    model.ready(function(result) {
        if (result) {
            model.register(username, password, function(result) {
                if (result)
                    res.send(JSON.stringify({result:true, explanation:""}));
                else
                    res.send(JSON.stringify({result:false, explanation:"Registration error"}));
            });
        }
        else
            res.send(JSON.stringify({result:false, explanation:"Connection error"}));
    });
});


//delete a user in mongoDB, client send post request with username and password
app.delete('/users', function(req, res) {
    var username = req.body.username;
	var password = req.body.password;
	console.log("username = %s, password = %s", username, password);
	
	model.ready(function(result) {
        if (result) {      //if ready ok
            model.isValid(username,password, function(result){  //check whether username already exist before delete it
				if(result){
					model.unsubscribe(username); 
					res.send(JSON.stringify({result:true, explanation:"unscrib ok"}));
				}				                   
                else
                    res.send(JSON.stringify({result:false, explanation:"Registration error"}));
            
			});
        }
        else   //if not ready
            res.send(JSON.stringify({result:false, explanation:"Connection error"}));
    });
  
});