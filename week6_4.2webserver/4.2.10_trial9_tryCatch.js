var divide = function(x, y) {
    if (y === 0)// throw new Error({name: 'Divide', message: "Can't divide by zero"});  // or        
        throw {name: 'Divide', message: "Can't divide by zero"};
    else
        return x/y;
};

try {
    var result = divide(4, 2);
        ...
}
catch (e) {
    console.log(e.message);  // Not just e.
}

//The '.sjs' program may make your web server program get crashed. What do you have to do?
try {
    var sjs = require(pathname);  // We assume all '.sjs' modules have proceed() function.
    sjs.proceed(_GET, _POST, function(html_content) {
        ....
    });
} 
catch (err) {
    ....
}

//How to unload the .sjs module after sending the html content? If the .sjs module is not unloaded, 
//the same module will be used again even though there is a change in the .sjs program.
try {
	pathname='test.sjs';
    var sjs = require(pathname);  // We assume all '.sjs' modules have proceed().
    sjs.proceed(_GET, _POST, function(html_content) {
        ....
        delete require.cache[require.resolve(pathname)];  // in order to unload this .sjs module
    });
} catch (err) {
    ....
    ???[???];  // in order to unload this .sjs module
}