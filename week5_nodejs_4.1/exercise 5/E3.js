//--in main.js------//-- at server ----- main.js 使用的是：exports.name
module = require('./modulefile.js');
module.prop();

var m = require('./modulefile');  // Not hello1.js? 
                                     // When there is no file extension, .js is assumed. 
                                     // Obviously you can also use a full file name, even with a different file extension.
                                     // require() returns an object having the property in 'exports' object from './modulefile.js'.
m.hello();



//---in modulefile.js
function myfunc(){ console.log('some text in modulefile function hello definition');}
exports.prop = myfunc;    //重要的不是function name, main.js 使用的是：exports.name
exports.hello = function() {console.log('Hello World!');}


//-- at server ----- main.js 使用的是：exports.name
$ node main.js

//--below is teacher's solution-----------------------------------------------------------------------------------
// index.js
hellooo = require("./hello");
hellooo.start();

// hello.js
function start() {
    console.log('Hello world!');
}
exports.start = start;