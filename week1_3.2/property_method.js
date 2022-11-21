var x = {};
Object.defineProperty(x, "p", { value : 3, writable: true, enumerable: false, configurable: true});
Object.defineProperty(x, "p", { writable: false} );


alert(Object.getOwnPropertyDescriptor(x, "p").writable); 
// .getOwnPropertyDescriptor() returns {vale:..., writable:..., enumerable:..., configurable:...}. 

http://xahlee.info/js/javascript_property_attributes.html