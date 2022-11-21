/* How to use
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

var conn;  // connection stub
var db;  // db stub
var connected = false;  // flag to see if a connection is made

function ready(cb)
{
    if (???) cb(true);
        
    else {
        mongoClient.connect(????, function(err, connection) {
            if(err) cb(false);
                
            else {
                conn = ???;
                db = ????;
                connected = ???;
                cb(???);
            }
        });
    }
}

function close() {
    if (???) {
        connected = ???;
        conn.close();
    }
}

function register(u, p, callback)
{
    var collection = db.collection("Users");
    
    ???.???(????, function(err, docs) {
        if (err) callback(false);
        else ????
    });
}

????

exports.ready = ready;
exports.close = close;
exports.exists = exists;
exports.isValid = isValid;
exports.register = register;
exports.unsubscribe = unsubscribe;