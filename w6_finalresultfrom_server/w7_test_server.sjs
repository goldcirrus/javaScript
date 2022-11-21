var model = require('./chat_model.sjs');  //  require test_model.sjs in the same directory; You need to start with "./"

function proceed (_GET, _POST, callback) {
    if (_POST['command'] == undefined)
        callback("No command");
    else
        switch(_POST['command']) {
            case 'join':
                model.ready(function(result) {
                    if (result)  //ready is ture
                        model.register(_POST['username'], _POST['password'], function(result2){
						       callback(result2);       //pass in user, password
						});
                    else
                        callback('Error');
                });
                break;
            default:
                callback('Unknown command');
        }
}

exports.sjsproceed = proceed;