/* How to use: in chatserver.sjs do the following codes
    var model = require('./chat_model.js');
	
    model.ready(function(result) {
        if (result)
            model.isValid(username, password, function(result) {
                ...
            });
    });
	
    model.ready(function(result) {
        if (result)
            model.exists(username, function(result) {
                ...
            });
    });
    ...
*/



var mongoClient = require("mongodb").MongoClient;

var conn;                                           // global variable:connection stub referes to connection to mongodb, accessable by all functions in this file
var db;                                             // global variable:db stub referes to database:COMP4620_lzhong, accessable by all functions in this file
var connected = false;                              // global variable: flag to see if a connection is made, accessable by all functions in this file


/*function ready check whether there is already a connection to mongodb
  if already connected, callback(true)
  else if not connected, make connection to mogodb:COMP4620_lzhong
     global variable conn referes to connection to mongodb connection
     global variable db referes to mongodb's database:'COMP4620_lzhong'
     global variable connected is a flag to show whethere the connection is alreay exist  
*/

function ready(callback)
{
    if (connected) callback(true);                  //if mongodb connection is already exist,return true via ready(callback)'s callback
        
    else {                                          //else if no database connection, need to make a new db connection
        mongoClient.connect('mongodb://lzhong:lzhong136@127.0.0.1:27017/COMP4620_lzhong', function(err, connection) {
            if(err) 
			    callback(false);           //if when open mongodb connection has err, return false via ready(callback)'s callback
                
            else {                          
                conn = connection;         //assign mongodb's connection to a global variable conn
                db = conn.db('COMP4620_lzhong');
                connected = true;
                callback(true);
            }
        });
    }
}

/*function close() can access global vairable conn and connected
  function close() can be invoked in another module:chatserver.sjs where the database connection is terminated. */
  
function close() {
    if (connected) {                //if mongodb is connected: if(connected is true)
        connected = false;              //change global variable flag connected to false
        conn.close();                   //finally close the global variable conn that referes to the connection to mongodb
    }
}

function register(u, p, callback)
{
    var collection = db.collection("Users");           //global variable db referes to database:COMP4620_lzhong, and create/refers to collection:Users
    
    collection.insertOne({'username':u,'password':p}, function(err, docs) {
        if (err) 
		   callback(false);                            //echo false back to client
        else 
		   callback(true)                               //echo true back to client
    });
}


/*to check if a document's username exists in database's collection: Users */

function exists(u, callback)  // You need to include the next code with the connection to MongoDB.
{
    var collection = db.collection("Users");         //db is the global variable referes to the database:COMP4620_lzhong
    
    collection.find({username:u}).toArray(function(err, results) {  // an example of find(); findOne() can be used instead
        if (err)                                             //results is an array contains all objects with the same user name ==u
		   callback(false);                       //find() operation has error
        else if (results.length>=1) 
		   callback(true);               //fetch something
        else
		   callback(false);             //fetch nothing, this username is not existed
    });
}

/*used to check if a document's username and password exist in database's collection: Users
  used to valudate the client query's input password value matches password stored in the database*/

function isValid(u, p, callback)  // You need to include the next code with the connection to MongoDB.
{
    var collection = db.collection("Users");        //db is the global variable referes to the database:COMP4620_lzhong
    
    collection.find({username:u,password:p}).toArray(function(err, results) {
        if (err)                                         //can not operate find()
		   callback(false);                   
        else if (results.length >0) 
		   callback(true);
        else 
		   callback(false);
    });
}

/*delete a document based on client's input of username */

function unsubscribe(u, callback)  // You need to include the next code with the connection to MongoDB.
{
    var collection = db.collection("Users");
    
    collection.drop(function(err, resultOK) {
        if(err) 
		  callback(false);
        else if(resultOK)
		  callback(true);
    });
}

exports.ready = ready;
exports.close = close;
exports.exists = exists;
exports.isValid = isValid;
exports.register = register;
exports.unsubscribe = unsubscribe;