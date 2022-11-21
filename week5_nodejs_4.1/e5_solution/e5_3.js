// index.js
hellooo = require("./hello");
hellooo.start();

// hello.js
function start() {
    console.log('Hello world!');
}
exports.start = start;
                         
						 
/*
Trial E3: Let's make a module hello.js. It includes start(). This function prints 'Hello World' using console, 
and it is exported.
Here is another file, index.js. This file requires hello.js as a module and uses it as folloing.
*/