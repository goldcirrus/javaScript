Trial E1: Let's get the GET data.
In test_router.js,
// for testing
var queryinURL = "op=addition&x=10&y=20";

// Node WebServer
var querystring = require('querystring');
var _GET = querystring.parse(queryinURL);
console.log("_GET: ", _GET);
Test the above file.

Trial E2: Let's get the POST data.
In test_router.js,
// for testing
var queryinURL = "op=addition&x=10&y=20";
var events = require('events');
var req = new events.EventEmitter();

// Node WebServer
var query = "";
req.on('data', function(chunk) {
    query += chunk;
});
req.on('end', function() {
    var querystring = require('querystring');
    var _POST = querystring.parse(query);
    console.log("_POST: ", _POST);
    // proceed_sjs({}, _POST, pathname);  // In Trial E3
});

// for testing
req.emit('data', queryinURL);
req.emit('end');
Test the above file.

Trial E3: Continuing E1 and E2, let's require a server-side JS, test_addition.sjs, file. _GET or _POST will have {op:'addition', x:10, y:20}.
In test_addition.sjs,
const proceed = function (_GET, _POST, callback) {
    if (_GET != undefined && _GET['op'] == 'addition') {
        var result = Number(_GET['x']) + Number(_GET['y']);
        callback(result);
    }
    if (_POST != undefined && _POST['op'] == 'addition') {
        var result = Number(_POST['x']) + Number(_POST['y']);
        callback(result);
    }
}

exports.proceed = proceed;
In test_router.js,
// for testing
let pathname = './test_addition.sjs';  // ./ should be included to say the file exists under the current working directory.

// This function is invoked after _GET or _POST is obtained.
function proceed_sjs(_GET, _POST, pathname) {
    var sjs = require(pathname);
    sjs.proceed(_GET, _POST, function(message) {
        console.log(message);
    });
}
Test the above two files.

Trial E4: Let's include the content of proceed_sjs() in try-catch.
In test_router.js,
// for testing
let pathname = './test_addition.sjssss';  // ./ should be included to say the file exists under the current working directory.

// This function is invoked after _GET or _POST is obtained.
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
Test the above two files with pathname = '.\test_addition.sjssss' that does not exist.

Trial E5: Exercise with MongoDB
Connect to MongoDB using your account.
Drop all collections if there is any.
> show collections
> db.collection_name.drop()
Insert student records into the Students collection. Each document is like
{
	name: 'Robert William',
	number: 'T00044556',
	address: {
		street: '900 McGill',
		city: 'Kamloops',
		province: 'BC'
	},
	phone: '(250) 377-5000',
	major: 'COMP',
	grades: [
		{ course: 'COMP 1130', grade: 'A' },
		{ course: 'COMP 3540', grade: 'A+' }
	]
}
Insert at least 3 documents including the above one.
> db.Students.insertOne(...)
List all collections. > show collections;
With the Students collection,
List all the documents.
> db.Students.find();
Find all the document of the students who live in BC.
> db.Students.find({"address.province":"BC"});
Find all the document of the students who has A+ or A in COMP 3540.
> db.Students.find({$and:[{"grades.course":"COMP 3540"}, {$or:[{"grades.grade":"A"}, {"grades.grade":'A+'}]}]});
Change the grade of COMP 1130 in the document in which the student number is T00044556.
> db.Students.updateMany({"number":"T00044556", "grades.course":"COMP 1130"}, {$set: {"grades.grade": "B"}});  // It won't work.
> db.Students.updateMany({"number":"T00044556", "grades.course":"COMP 1130"}, {$set: {"grades.$.grade": "B"}});  // $ is used for position in an array.
Find the document of the student having the above student number.
> db.Students.find({number:"T00044556"});
Delete a document with a student number.
> db.Students.deleteMany({number:"T00044556"});