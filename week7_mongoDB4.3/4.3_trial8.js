function register(u, p, callback)  // You need to include the next code with the connection to MongoDB.
{
    var mongoClient = require('mongodb').MongoClient;

                      // mongodb://username:password@server[:port]/databasename
    mongoClient.connect('mongodb://lzhong:lzhong136@127.0.0.1:27017/COMP4620_lzhong', function(err, conn)
    {
        if(err) callback(false);
        
        var db = conn.db();  // Get db from conn
        var collection = db.collection("Users");
        
        collection.insertOne({username:u,password:p}, function(err, docs) {
           
            if (err) 
			   callback(false);      //send false back to client via echoSjs() function
            else 
			   callback(true);       //send true back to client via echoSjs() function
			
			conn.close();            //close connection here, not outside of insertOne()
        });       //end of insertOne()
        
         //don't close conn.close(); here, because the connect will be closed too early before the completion of database operations
    });
}

register("john", "topoftheworld", function(result) {
    console.log(result);
});