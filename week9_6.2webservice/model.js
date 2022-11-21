
/*
Model for TRUWebService

ready(cb)
    true or false
close()
exists(username, cb)
    true or false
isValid(username, password, cb)
    true or false
register(username, password, cb)
    true or false
unsubscribe(username)
signin(username)
signout(username)
getNewToken(username, cb) 
    token id, or
    -1 (error case)
deleteToken(id) 
collection(token_id, collection_name, cb)  // use collection_name for token_id
    (true, 1), or 
    (false, -1) or (false, -2)
insertOne(token_id, doc, cb) 
find(token_id, query, cb) 
    (true, result) or
    false
updateMany(token_id, query, newdoc, cb) 
    true or false
deleteMany(token_id, query, cb) 
    true or false
    
*/

var URL = "mongodb://lzhong:lzhong136@127.0.0.1:27017/COMP4620_lzhong";  // MongoDB

var mongoClient = require("mongodb").MongoClient;

var conn;
var db;
var connected = false;

function ready(cb)
{
    if (connected)
        cb(true);
        
    else {
        mongoClient.connect(URL, function(err, connection) {
            if(err) 
                cb(false);
                
            else {
                conn = connection;
                db = conn.db();
                connected = true;
                cb(true);
            }
        });
    }
}

function close() {
    if (connected) {
        connected = false;
        conn.close();
    }
}

function exists(u, cb)
{
    var collection = db.collection("Users");

    collection.findOne({username:u}, function(err, results)
    {
        if (err)
            cb(false);
        else if (results != null) {
            cb(true);
        } else
            cb(false);
    });
}

function isValid(u, p, cb)
{
    var collection = db.collection("Users");

    collection.findOne({username:u, password:p}, function(err, results)
    {
//console.log("isValid(): %s, %s", u, p);
        if (err)
            cb(false);
        else if (results != null)
            cb(true);
        else
            cb(false);
    });
}

function register(u, p, callback)
{
    exists(u, function(result) 
    {
        if (result)      //new user exist
            callback(false);

        else {  //new user not exist
            var collection = db.collection("Tokens");
            if (collection.countDocuments({}) == 0) {        //not countDocuments()
                console.log("Tokens: empty");
                collection.insertOne({count: 0});
            }

            collection = db.collection("Users");
            collection.insertOne({username:u, password:p, signedin:false}, function(err, docs)
            {
                if (err)
                    callback(false);
                else
                    callback(true);
            });
        }
    });
}

function unsubscribe(u)
{
    db.collection("Users").deleteMany({username:u});
    db.collection("Tokens").deleteMany({username: u});
}

function signin(u)
{
    var collection = db.collection("Users");

    collection.updateOne({username:u}, {$set: {signedin: true}});
}

function signout(u)
{
    db.collection("Users").updateOne({username:u}, {$set: {signedin: false}});
}

function getNewToken(u, cb) 
{
    var collection = db.collection("Tokens");
    collection.findOne({count: {$exists: true}}, function(err, doc) {
//console.log(err + ", " + doc);
        if (err != null)
            cb(false, -1);

        else {
            var id;
            if (doc == null) {  // Not existing
                collection.insertOne({count: 1});
                id = 1;
            }
            else {
                id = doc.count + 1;
                collection.updateOne({count: {$exists: true}}, {$set: {count: Number(id)}});
            }

            collection.findOne({username: u}, function(err, doc) {
                if (err == null) {
                    if (doc == null)  // Not existing
                        collection.insertOne({username: u, tokenid: Number(id)});
                    else
                        collection.updateOne({username: u}, {$set: {tokenid: Number(id)}});
                    cb(true, id);
                }
                else
                    cb(false, -1);
            });
        }
    });
}

function deleteToken(id) 
{
    db.collection("Tokens").deleteMany({tokenid: {$eq: Number(id)}});  // Number() is important.
}


function collection(token_id, collection_name, cb) 
{
    var collection = db.collection("Tokens");
    collection.findOne({tokenid: Number(token_id)}, function(err, doc) {
        if (err == null) {
            if (doc == null)  // No such connection
                cb(false, -1);
            else {
                collection = db.collection("Users");
                collection.updateOne({username: doc.username}, {$set: {collectionname: collection_name}});
                cb(true, 1);  // 1: collection id
            }
        }
        else
            cb(false, -2);  // Unknow error
    });
}


function insertOne(token_id, doc, cb) 
{
    var collection = db.collection("Tokens");
    collection.findOne({tokenid: Number(token_id)}, function(err, tokendoc) {
        if (err == null) {
            if (tokendoc == null)  // No such connection
                cb(false);
            else {
                collection = db.collection("Users");
                collection.findOne({username: tokendoc.username}, function(err, result) {
                    if (err)
                        cb(false);
                    else {
                        if (result != null) {
                            collection = db.collection(result.collectionname);
                            console.log("Collection name = %s", result.collectionname);
                            collection.insertOne(doc, function(err, result) {
                                if (err)
                                    cb(false);
                                else
                                    cb(true);
                            });
                        } else
                            cb(false);
                    }
                });
            }
        }
        else
            cb(false);  // Unknow error
    });
}


function find(token_id, query, cb) 
{
    var collection = db.collection("Tokens");
    collection.findOne({tokenid: Number(token_id)}, function(err, tokendoc) {
        if (err == null) {
            if (tokendoc == null)  // No such connection
                cb(false);
            else {
                collection = db.collection("Users");
                collection.findOne({username: tokendoc.username}, function(err, result) {
                    if (err)
                        cb(false);
                    else {
                        if (result != null) {
                            collection = db.collection(result.collectionname);
                            console.log("Collection name = %s", result.collectionname);
                            collection.find(query).toArray(function(err, results) {
                                if (err)
                                    cb(false);
                                else
                                    cb(true, results);
                            });
                        } else
                            cb(false);
                    }
                });
            }
        }
        else
            cb(false);  // Unknow error
    });
}


function updateMany(token_id, query, newdoc, cb) 
{
    var collection = db.collection("Tokens");
    collection.findOne({tokenid: Number(token_id)}, function(err, tokendoc) {
        if (err == null) {
            if (tokendoc == null)  // No such connection
                cb(false);
            else {
                collection = db.collection("Users");
                collection.findOne({username: tokendoc.username}, function(err, result) {
                    if (err)
                        cb(false);
                    else {
                        if (result != null) {
                            collection = db.collection(result.collectionname);
                            console.log("Collection name = %s", result.collectionname);
                            collection.updateMany(query, newdoc, function(err, results) {
                                if (err)
                                    cb(false);
                                else
                                    cb(true);
                            });
                        } else
                            cb(false);
                    }
                });
            }
        }
        else
            cb(false);  // Unknow error
    });
}


function deleteMany(token_id, query, cb) 
{
    var collection = db.collection("Tokens");
    collection.findOne({tokenid: Number(token_id)}, function(err, tokendoc) {
        if (err == null) {
            if (tokendoc == null)  // No such connection
                cb(false);
            else {
                collection = db.collection("Users");
                collection.findOne({username: tokendoc.username}, function(err, result) {
                    if (err)
                        cb(false);
                    else {
                        if (result != null) {
                            collection = db.collection(result.collectionname);
                            console.log("Collection name = %s", result.collectionname);
                            collection.deleteMany(query, function(err, results) {
                                if (err)
                                    cb(false);
                                else
                                    cb(true);
                            });
                        } else
                            cb(false);
                    }
                });
            }
        }
        else
            cb(false);  // Unknow error
    });
}


exports.ready = ready;
exports.close = close;
exports.exists = exists;
exports.isValid = isValid;
exports.register = register;
exports.unsubscribe = unsubscribe;
exports.signin = signin;
exports.signout = signout;
exports.getNewToken = getNewToken;
exports.deleteToken = deleteToken;
exports.collection = collection;
exports.insertOne = insertOne;
exports.find = find;
exports.updateMany = updateMany;
exports.deleteMany = deleteMany;