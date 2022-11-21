In test.js,
let tilde = require('tilde-expansion');

let pathname = "/~comp3540test/test.html";  // Test with /test.html also.

let words = pathname.split('/'); // word[0] is '' and word[1] is '~...' because pathname starts with '/'.
if (words[1][0] == '~') {  // e.g., /~tom/...
    tilde(words[1], function(expanded) {  // Note that a callback function is used.
        var new_pathname = '/' + expanded + '/public_html';  // 'public_html' should be included.
        for (var i = 2; i < words.length; i++)
            new_pathname += '/' + words[i];
        displaymsg(new_pathname);
    });
}
else {
    var new_pathname = "/var/www/html" + pathname;
    displaymsg(new_pathname);
}

function displaymsg {
    console.log(pathname);
}