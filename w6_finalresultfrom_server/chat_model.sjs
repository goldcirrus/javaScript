var mongoClient = require("mongodb").MongoClient;  // Make sure this module be installed.

var conn;                                  // connection stub
var db;                                   // db stub
var connected = false;                       // flag to see if a connection is made

function ready(cb)
{
    if (connected) cb(true);
        
    else {
        mongoClient.connect('mongodb://lzhong:lzhong136@127.0.0.1:27017/COMP4620_lzhong', function(err, connection) {
            if(err) cb(false);
                
            else {
                conn = connection;
                db = connection.db('COMP4620_lzhong');
                connected = true;
                cb(true);
            }
        });
    }
}

function register(u, p, cb)
{
    var collection = db.collection("Users");
    
    collection.insertOne({'username':u,'password':p}, function(err, docs) {
        if (err) cb(false);
        else cb(true);
    });
}

exports.ready = ready;
exports.register = register;