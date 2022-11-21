//In chat_model.sjs

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

function register(u, p, callback)       //u,p is the value passed in via client's query
{
    var collection = db.collection("Users");   //db is the global variable referes to the mongodb database:COMP4620_lzhong, now make a collection('Users') to this database
    
    collection.insertOne({'username':u,'password':p}, function(err, docs) {
        if (err) 
			callback(false);             //echo false back to client
        else 
			callback(true);              //echo true back to client
    });
}

/*export function definitions to be used in server.sjs*/
exports.ready = ready;
exports.register = register;





/*In w7_test_server.sjs, which will be called in testview.html. 
  clent's browser will query via http://cs.tru.ca:8057/~lzhong/week6/testview.html
*/
var model = require('./chat_model.sjs');  //  require chat_model.sjs in the same directory; You need to start with "./"

function proceed (_GET, _POST, callback) {
    if (_POST['command'] == undefined)
        callback("No command");
    else
        switch(_POST['command']) {
            case 'join':
                model.ready(function(result) {        //ready(cb) first check the database connection, if result is true, invoke register(callback), then inside its callback to send database operation result to client
                    if (result)                              //ready is ture
                        model.register(_POST['username'], _POST['password'], function(result2){    //pass in user, password
						       callback(result2);       
						});
                    else                      //ready(cb) first check the database connection, else if result is false, just invoke callback(send err msg to client) 
                        callback('Error');
                });
                break;
            default:
                callback('Unknown command');
        }
}

exports.sjsproceed = proceed;