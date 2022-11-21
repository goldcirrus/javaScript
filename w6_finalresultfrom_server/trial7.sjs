const sjsproceed = function(_GET, _POST, callback)  {
    var mongoClient = require('mongodb').MongoClient;     //open MongoDB driver for node.js

    // mongodb://username:password@server[:port]/databasename
    mongoClient.connect('mongodb://lzhong:lzhong136@127.0.0.1:27017/COMP4620_lzhong', function(err, conn)
    {
        if(err) throw('Connection error');
        
		callback("MongoDB connected");
		
        conn.close();
    });
}

exports.sjsproceed = sjsproceed;
