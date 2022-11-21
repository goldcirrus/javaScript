var person = (function(n, a) {  // What value does person have? function() { ... or the returned function?
                                // What is (function() { ... })()? Function invocation?
    var name = n;
    var age = a;
	
    return {                    // What kind of data is returned?
        first_name: name,
        get_name: function() { return name; },               // NOT this.name
        set_name: function(new_name) { name = new_name; },
        get_age: function() { return age; },                 // NOT this.age
        set_age: function(new_age) { age = new_age; }
    };
})('Tim', 22);  //父方程 must be invoked with argument: 'Tim', 22 是父方程的数据被传送给 returned Object


alert(person.age);  // undefined; why???

person.name = 'Gildong';  // This name is not the private variable name. Why???
alert(person.first_name);  // 'Tim'

person.first_name = 'Gildong';  // This first_name is the public variable first_name.
alert(person.first_name);  // 'Gildong'; It does not change the private variable.

alert(person.get_name());  // 'Tim'

alert(person.get_age());

person.set_age(24);
alert(person.get_age());