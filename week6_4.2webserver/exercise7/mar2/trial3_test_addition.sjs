//Trial E3: Continuing E1 and E2, let's require a server-side JS, test_addition.sjs module file.
//_GET or _POST will have {op:'addition', x:10, y:20}.

//In test_addition.sjs file

const proceed = function(_GET, _POST, callback) {
    if (_GET != undefined && _GET['op'] == 'addition') {
        var result = Number(_GET['x']) + Number(_GET['y']);          //result is the sum of 'x' and 'y'
        callback(result);                                      //callback used to send message back: doing something with (result).
    }
    if (_POST != undefined && _POST['op'] == 'addition') {
        var result = Number(_POST['x']) + Number(_POST['y']);     //result is the sum of 'x' and 'y'
        callback(result);                         //callback used to send message back: doing something with (result). 
    }
}
                               
exports.proceed = proceed;






//Below codes are in test_router.js to add the below pathname to find where is the above test_addition.sjs module file 
//and the below function's definition to invoke sjs.proceed() function in the test_addition.sjs module
//see trial3_combined.js

let pathname = './test_addition.sjs';  // ./ should be included to say the file exists under the current working directory.

// This function is invoked after _GET or _POST is obtained.

function proceed_sjs(_GET, _POST, pathname) {
    var sjs = require(pathname);
    sjs.proceed(_GET,_POST,function(message) {
        console.log(message);
    });
}

//update the above function: try-catch. This function is invoked after _GET or _POST is obtained.
function proceed_sjs(_GET, _POST, pathname) {
    try {
        var sjs = require(pathname);
        sjs.proceed(_GET, _POST, function(message) {
            console.log(message);
        });
    }
    catch(err) {
        consol.log("Internal error");
    }
}


