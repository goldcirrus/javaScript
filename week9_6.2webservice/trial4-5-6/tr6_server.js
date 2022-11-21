const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const model = require('./model.js');
const port = 8058

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Allow Cross-domain requests
app.all('/*', function(req, res, next) {  // /*: any routes
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();  // For further operations
});

// parse application/x-www-form-urlencoded for POST
app.use(bodyParser.urlencoded({ extended: true }))

// SignUp
app.post('/users', (req, res) => {
    console.log('POST /users');
    model.ready(function(result) {
        if (!result) {
            let message = {result:false, explanation:"Connection error"};
            res.send(JSON.stringify(message));
        } else {
            model.register(req.body.username, req.body.password, function(result) {
                if (!result) {
                    let message = {result:false, explanation:"User registration error"};
                    res.send(JSON.stringify(message));
                } else {
                    let message = {result:true, explanation:""};
                    res.send(JSON.stringify(message));
                }
            });
        }
    });
})

// Delete/Unsubscribe user
app.delete("/users", (req, res) => 
{
    var username = req.body.username;
    var password = req.body.password;
    console.log("DELETE users: username=%s, password=%s", username, password);
    if (username == undefined || password == undefined) {
        var msg = {result:false, explanation:"Invalid paramenters"};
        res.send(JSON.stringify(msg));
        return;
    }

    model.ready((result) => {
        var msg;
        if (!result) {
            msg = {result:false, explanation:"Cannot connect to MongoDB"};
        }
        else {
            model.unsubscribe(username, password);
            msg = {result:true, explanation:""};
        }
        res.send(JSON.stringify(msg));
    });
});

// Create a token for a connection
// SignIn
app.post('/tokens', (req, res) => {
    console.log('POST /tokens');
    model.ready(function(result) {
        if (!result) {
            var msg = {tokenid:-1, explanation:"Connection error"};
            res.send(JSON.stringify(msg));
        } else {
            model.isValid(req.body.username, req.body.password, function(result) {
                if (!result) {
                    var msg = {tokenid:-2, explanation:"User not found"};
                    res.send(JSON.stringify(msg));
                } else {
                    model.getNewToken(req.body.username, (result, id) => {
                        if (result) 
                            var msg = {tokenid: id, explanation:""};
                        else
                            var msg = {tokenid: -1, explanation:"Cannot get a new token"};
                        res.send(JSON.stringify(msg));
                    });
                }
            });
        }
    });
})

// Close a connection
app.delete('/tokens/:id', (req, res) => {
    console.log('DELETE /tokens/%s', req.params.id);
    model.ready(function(result) {
        if (!result) {
            var msg = {result:false, explanation:"Connection error"};
            res.send(JSON.stringify(msg));
        } else {
            model.close();
            var msg = {result:true, explanation:""};
            res.send(JSON.stringify(msg));
        }
    });
})
