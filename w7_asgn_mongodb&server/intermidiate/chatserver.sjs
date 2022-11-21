var model = require("./chatmodel.sjs");            //  require test_model.sjs in the same directory; You need to start with "./"

function sjsproceed(_GET, _POST, callback)
{
    if (_POST['command'] == undefined)
        callback("No command");
    
    else
        switch (_POST['command']) {
        case 'signin': 
            model.ready(function() {
                model.isValid(_POST['username'], _POST['password'], function(result) {
                    if (result)
                        callback("Valid");
                    else 
                        callback("Invalid");
                });
            });
            break;
			
        case 'join': 
            ????
            break;
			
        case 'unsubscribe': 
            ????
            break;
			
        default:
            callback('Unknown command - ' + _POST['command']);
            break;
        }
}

exports.sjsproceed = sjsproceed;