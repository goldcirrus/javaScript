//check file or directory

const path = require("path");  // reference: Node.js Path Module

let fileordirname = path.basename(pathname);
let words = fileordirname.split(".");
if (words.length > 1>) {
    let extension = words[words.length - 1];
    ...
} else 
    ...
	
	
//If there is no file extension, we assume basename is a directory, and '/index.html' is attached. See 4.2.4
const path = require("path");

let fileordirname = path.basename(pathname);
let words = fileordirname.split(".");
let extension;
if (words.length > 1>) {
    extension = words[words.length - 1];
} else {
    pathname = ????
    extension = ????
}
...