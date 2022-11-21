//In chatmodel1.sjs

var mongoClient = require("mongodb").MongoClient;  // Make sure this module be installed: $npm install mongodb

var conn;  // connection stub refers to ready function's mongoClent.connect()'s callback's (..., connection). conn is global,so the connection can be used by every function
var db;                       // db stub refers to above connection's database object: 'COMP4620_lzhong
var connected = false;        // flag to see if a connection is made

/*function ready check whether there is already a connection to mongodb
  if already connected, callback(true)
  else if not connected, make connection to mogodb:COMP4620_lzhong
     global variable conn referes to connection to mongodb connection
     global variable db referes to mongodb's database:'COMP4620_lzhong'
     global variable connected is a flag to show whethere the connection is alreay exist  
*/

function ready(callback)     //cb is callback function
{
    if (connected) 
		callback(true);      //if connected is already true(exist), ready(cb) return true via callback(true)
        
    else {                        //else if connected is not connected yet, make a connection to mongodb
        mongoClient.connect('mongodb://lzhong:lzhong136@127.0.0.1:27017/COMP4620_lzhong', function(err, connection) {
            if(err) 
				callback(false);                    //if when connect to mongodb has err, ready(cb) return false via callback(false)
                
            else {                        //else(when not already connected): connect to mongodb:COMP4620_lzhong,  
                conn = connection;
                db = conn.db('COMP4620_lzhong');      //assign mongodb connection to global variable:conn and db
                connected = true;                     //change global variable flag connected to true
                callback(true);                      //ready(callback) return ture via its callback function
            }
        });
    }
}

function register(u, p, em, callback)       //u,p is the value passed in via client's query
{
    var collection = db.collection("Users");   //db is the global variable referes to the mongodb database:COMP4620_lzhong, now make a collection('Users') to this database
    
    collection.insertOne({'username':u,'password':p,'email':em}, function(err, docs) {
        if (err) 
			callback(false);             //echo false back to client
        else 
			callback(true);              //echo true back to client
    });
}

/*#############################################*/


/*used to check if a document's username and password exist in database's collection: Users
  used to valudate the client query's input password value matches password stored in the database*/

function isValid(u, p, callback)                //check username and password in database, return ture or false via its callback 
{
    var collection = db.collection("Users");        //db is the global variable referes to the database:COMP4620_lzhong
    
    collection.find({username:u,password:p}).toArray(function(err, resultArray) {
        if (err)                                         // if err means can not find the record end of function
		   callback(false);   
		   
        else if (resultArray.length >0) 
		   callback(true);
        else 
		   callback(false);
    });
}


/*delete a document based on client's input of username and password */

function unsubscribe(u,p, callback)  // You need to include the next code with the connection to MongoDB.
{
    var collection = db.collection("Users");
    
    collection.deleteMany({username:u,password:p},function(err, resultObj) {    //resultOK is either true or false depending on delete success or failure
        if(err) 
		   callback(false);          //if err means can not find a record to delete. end of function
        else
           callback(true);
          		
		} 
    });
}

/*export function definitions to be used in server.sjs*/
exports.ready = ready;
exports.register = register;
exports.isValid = isValid;
exports.unsubscribe = unsubscribe;