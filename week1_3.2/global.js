
// These are both globals.
var foo = 1;
bar = 2;

function() {
    var foo = 1; // Local
    bar = 2;     // Global

    // Execute an anonymous function. Isn't it interesting?
    (function() {
        var wibble = 1; // Local
        foo = 2; // Inherits from the scope above (creating a closure)
        moo = 3; // Global
    })();
}