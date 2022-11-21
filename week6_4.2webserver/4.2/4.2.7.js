var fs = require('fs');
var filename = 'test.html';
fs.readFile(filename, 'utf8', function(err, content) {
    if (!err) {
        console.log(content);
    }
    else {
        console.log(err);
    }
});