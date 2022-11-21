const express = require('express')
const app = express()
const bodyParser = require('body-parser')  // for query with POST  from client
const port = 8058

// For CORS
app.all('/*', function(req, res, next) {  // /*: any routes
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");  // Default: only GET and POST
    next();  // Express middleware function; To continue to next operations. pass control to the next handler
});

// GET method route; what is a router here?
app.get('/users', (req, res) => {
  res.send('GET: username=' + req.query.username + "; password=" + req.query.password)  //client send via $.get a query JSON string: {username:xx,password:yy}
})                                                                                      //E.g., .../users?username=john&password=topsecret

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// POST method route
app.post('/users', (req, res) => {
  res.send('POST: username=' + req.body.username + "; password=" + req.body.password)    //client send via $.post a query JSON string: {username:xx,password:yy}
})                                                                                        //E.g., .../users?username=john&password=topsecret

app.listen(port, () => {                                    //server app listen on port 8058
  console.log(`Example app listening on port ${port}`)
})