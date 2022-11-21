//In test.js,
let tilde = require('tilde-expansion');

let pathname = "/~lzhong/week5/spring.html";  // Test with /test.html also.

let words = pathname.split('/'); // word[0] is '' and word[1] is '~...' because pathname starts with '/'.
if (words[1][0] == '~') {  // e.g., /~tom/...
    tilde(words[1], function(expanded) {  // Note that a callback function is used.
        var new_pathname = '/' + expanded + '/public_html';  // 'public_html' should be included.
        for (var i = 2; i < words.length; i++)
            new_pathname += '/' + words[i];
        proceed(new_pathname);
        console.log('the newpathname is: '+new_pathname);
    });
}
else {
    var new_pathname = "/var/www/html" + pathname;
    proceed(new_pathname);
}

let fs = require("fs");
const proceed = function(pathname) {
    fs.readFile(pathname, 'utf8', function(err, content) {
        if (!err) {
            console.log(content);
        }
        else {
            console.log(err);
        }
    });
}


