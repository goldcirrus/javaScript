//---- TRUWSJS ----
var sjs = require(pathname);  // 'pathname'(test.sjs) is a sjs script file. This file is required as a module.
                          // We assume that all '.sjs' programs have the function, proceed(), that is the starting point like main() in Java and C/C++ programs.


//pass query info to callback
sjs.proceed(_GET, _POST, function(html_content) {  // callback function to get the result from the sjs program
    ....//_GET,_POST link to the query object
    response.???(html_content);
    response.???();
});


//---- test.sjs ----server side script is one function for application
function proceed(_GET, _POST, callback) {
    var html;
    ....
    ???(html);
}
???.??? = proceed;