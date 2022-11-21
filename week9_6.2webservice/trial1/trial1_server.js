const express = require('express')       //$ npm install express
const app = express()
const port = 8058

// Allow Cross-domain requests, i.e., CORS (Cross-Origin Resource Sharing)
//   Why do we need this?
app.all('/*', function(req, res, next) {  // /*: any routes
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");  // Default: only GET and POST
    next();  // Express middleware function; To continue to next operations. pass control to the next handler
});

// GET method route: '/'; what is a router here? ==> the root sign
//Respond with Hello World! on the homepage
app.get('/', (req, res) => {
  res.send('GET: Hello World!')
})

// POST method route: '/'
//Respond to POST request on the root route (/), the application’s home page
app.post('/', (req, res) => {
  res.send('POST: Hello World!')
})

app.listen(port, () => {                                        //app in server listen on port 8058
  console.log(`Example app listening on port ${port}`)
})



//open server: node trial1_server.js

/*
Route paths, in combination with a request method, define the endpoints at which requests can be made. 
https://expressjs.com/en/guide/routing.html

Route paths can be strings, string patterns, or regular expressions.
The characters ?, +, *, and () are subsets of their regular expression counterparts. 
The hyphen (-) and the dot (.) are interpreted literally by string-based paths.
If you need to use the dollar character ($) in a path string, enclose it escaped within ([ and ]). 
For example, the path string for requests at “/data/$book”, would be “/data/([\$])book”.*/