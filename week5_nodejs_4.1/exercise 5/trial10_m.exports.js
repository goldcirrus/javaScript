// modulefile.js
module.exports = function() {console.log('Hello World!');}


// main.js
var m = require('./modulefile');
m();     //call model 本人，没有下属的function被call



//-- at server ----------------------------------------
$ node main.js