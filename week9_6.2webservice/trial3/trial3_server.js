//How to check parameters? E.g., .../tokens/1 and .../tokens/1,2. Let's req.params.id. 


const express = require('express')
const app = express()
const port = 8058


// To support CORS
app.all('/*', function(req, res, next) {  // /*: any routes
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");  // Default: only GET and POST
    next();  // Express middleware function; To continue to next operations
});

// GET method route; what is a router here?
app.get('/tokens/:id', (req, res) => {
  res.send('GET: /tokens; id=" + req.params.id);
})

// for POST query
app.use(bodyParser.urlencoded({ extended: true }));

// POST method route
app.post('/tokens/:id', (req, res) => {
  res.send('POST: /tokens; id=' + req.params.id);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})