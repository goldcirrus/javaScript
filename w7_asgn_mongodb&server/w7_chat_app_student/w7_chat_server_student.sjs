var model = ????

function sjsproceed(_GET, _POST, callback)
{
    if (_POST['command'] == ???)
        callback("No command");
    
    else
        switch (_POST[???]) {
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
        case ???: 
            ????
            break;
        case ???: 
            ????
            break;
        default:
            callback('Unknown command - ' + _POST['command']);
            break;
        }
}

exports.sjsproceed = sjsproceed;


