function proceed (_GET, _POST, callback) {
    if (_POST['command'] == undefined)
        callback("No command");
    else
        callback(_POST['command']);  // You may send the command value?
}

exports.proceed = proceed;