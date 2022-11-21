//3 ways to create objects. 

//first way using a function/constructor to define a class ------------------------------------------------------------------------------

function Apple (type) {  // This is similar to the definition of a class in Java.
                         // The keyword is function, not class.
                         // A function is a constructor that is instantiated later.
    this.type = type;  // this.type: global; type: local
    this.color = "red";
    this.getInfo = function() {
        return this.color + ' ' + this.type + ' apple';
    };
};

var apple = new Apple('macintosh');  // keyword 'new' to create an object
apple.color = "reddish";
alert(apple.getInfo());



function Car (type, color) {
    this.type = type;
    this.color = color;
};

var passat = new Car('passenger', 'black');

Car.prototype.size = 'small';
Car.prototype.getInfo = function() {                       // Car.prototype.property_key add new property key to Car class 
    return this.color + ' ' + this.type + ' car';
};

var golf = new Car('passenger', 'silver');

alert("golf: "+golf.getInfo()+" "+golf.size);
alert("passat: "+passat.getInfo()+" "+passat['size']);  

//second way: use object literals to instanciate an object instance -----------------------------------------------------------------------------------

var o = {};  // or var o = new Object();
// for arrays
var a = [];  // or var a = new Array();

var apple = {                     // only create an apple object instance, not an apple class. In this case you cannot create another instance of the class later.
    type: "macintosh",
    color: "red",
    getInfo: function () {
        return this.color + ' ' + this.type + ' apple';
    }
}

apple.color = "new reddish";
alert("a literal object instance only: "+apple.getInfo());

      //or
var apple = {};

apple.type = 'Gala';                   // Not apple.prototype.type. Because apple is an object instance. 
apple.color = 'Red';
apple.getInfo = function () {
    return this.color + ' ' + this.type + ' apple';
};

alert("an empty object instance extended: "+apple.getInfo());


//third way: use anonymous function and new keyword to create an object instance ------------------------------------------------------------------------------

var apple = new function() {          //an instance of apple object, useing new keyword. 
    this.type = "macintosh";
    this.getInfo = function () {
        return this.color + ' ' + this.type + ' apple';
    };
}

apple.color = "reddish";      //add new propert to an instance of object without prototype
alert("new keyword instanciate an instance of object: " + apple.getInfo());