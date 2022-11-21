
/*In chatserver1.sjs, which will be called in chatview.html. 
  clent's browser will query via http://cs.tru.ca:8058/~lzhong/week7/chatview.html
*/

var model = require('./chatmodel1.sjs');  //  require chat_model.sjs in the same directory; You need to start with "./"

function proceed (_GET, _POST, callback) {
    if (_POST['command'] == undefined)
        callback("No command");
    else
        switch(_POST['command']) {
            case 'join':
                model.ready(function(result) {        //ready(cb) first check the database connection, if result is true, invoke register(callback), then inside its callback to send database operation result to client
                    if (result) 
                    {
                        model.exist(_POST['username'], function(existOK){
                               if(!existOK)
                                    model.register(_POST['username'], _POST['password'], _POST['email'],function(insertMSG){
									           callback(insertMSG);
									});
                               else
                                    callback("user is already exist. Please select another username.");
                        });
                        
                    }
                    else                      //ready(cb) first check the database connection, else if result is false, just invoke callback(send err msg to client) 
                        callback('ready failed to cinnect database when ready for register in database.');
                });
                break;
			
			case 'signin':
                model.ready(function(result) {        //ready(cb) first check the database connection, if result is true, invoke register(callback), then inside its callback to send database operation result to client
                    if (result)                              //ready is ture
                        model.isValid(_POST['username'], _POST['password'], function(resultOK){    //pass in user, password
						       callback(resultOK);       
						});
                    else                      //ready(cb) first check the database connection, else if result is false, just invoke callback(send err msg to client) 
                        callback('Error to connect database when ready for signin.');
                });
                break;
				
			case 'unsubscribe':
                model.ready(function(result) {        //ready(cb) first check the database connection, if result is true, invoke register(callback), then inside its callback to send database operation result to client
                    if (result)                              //ready is ture
                        model.unsubscribe(_POST['username'], _POST['password'],function(delOK){    //pass in user, password
						       callback(delOK);       
						});
                    else                      //ready(cb) first check the database connection, else if result is false, just invoke callback(send err msg to client) 
                        callback('Error to cinnect database when ready for unsubscribe in database.');
                });
                break;
				
            default:
                callback('Unknown command');
        }
}

exports.sjsproceed = proceed;