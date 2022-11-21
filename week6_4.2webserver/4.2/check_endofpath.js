

const path = require("path");  // reference: Node.js Path Module

let fileordirname = path.basename(pathname);     //lastpart of a path

let words = fileordirname.split(".");             //if is file name, then it has . to separae the file extension
if (words.length > 1>) {                          //has extension, which is the last element in words
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
    pathname = pathname + 'index';
    extension = 'html';
}
...