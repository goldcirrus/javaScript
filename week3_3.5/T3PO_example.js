window.addEventListener('load', function() {
    // Description of models
    var models = {  // All the properties are optional.
        't3pom1': { initial: 3 },
        't3pom2': { 
             initial: 7,
             tojs: testfromt3po  // To JS code; This will be called whenever this model is changed.
                                 // This function is a user defined function in the same file.
        },
        't3pom4': { initial: 'USA' },
        't3pom5': { initial: ['3540', '4620'] },  // Multiple value model; E.g., the inputs of checkbox type and the select element with multiple
        't3pom7': {},
        't3pom8': {},
        't3pom12': { initial: ['VW', 'Hyundai'] },
        't3pom13': { initial: 'like Object.observe()', tojs: testfromt3po13  }  // Not bound to any View-input
    };
	
    // Description of View-inputs
    var view_inputs = [  // event is optional. The default event is change.
        { id: 't3poi1', model: [ 't3pom1' ] },
        { id: 't3poi2', model: [ 't3pom2' ] },
        { id: 't3poi3', model: [ 't3pom1' ], event: 'keyup' },
        { id: 't3poi4', model: [ 't3pom4' ] },  // Radio buttons with the same name are all bound to one model
        { id: 't3poi5', model: [ 't3pom4' ] },
        { id: 't3poi6', model: [ 't3pom4' ] },
        { id: 't3poi9', model: [ 't3pom5' ] },  // Checkboxes with the same name are all bound to one model
        { id: 't3poi10', model: [ 't3pom5' ] },
        { id: 't3poi11', model: [ 't3pom5' ] },
        { id: 't3poi7', model: [ 't3pom7' ] },
        { id: 't3poi8', model: [ 't3pom8' ] },
        { id: 't3poi12', model: [ 't3pom12' ] }
    ];
	
    // Description of View-outputs
    var view_outputs = [
        { id: 't3poo1', model: [ 't3pom1', 't3pom2' ], expr: "'The result is ' + (Number(T3PO.t3pom1) + Number(T3PO.t3pom2)) + '.'" },  // For each model, 'T3PO.' should be attached.
        { id: 't3poo2', model: [ 't3pom7' ], expr: "T3PO.t3pom7 + ', external var y=' + y" }, 
        { id: 't3poo8', model: [ 't3pom8' ], expr: "T3PO.t3pom8" },
        { id: 't3poo9', model: [ 't3pom4' ], expr: "T3PO.t3pom4" },
        { id: 't3poo10', model: [ 't3pom5' ], expr: "T3PO.t3pom5" },
        { id: 't3poo12', model: [ 't3pom12' ], expr: "T3PO.t3pom12" },
        { id: 't3poo13', model: [ 't3pom13' ], expr: "T3PO.t3pom13" }
    ];

    // Create the Tru3PO object
    t3po = new Tru3PO(models, view_inputs, view_outputs);
    ...
    t3po.update('t3pom2', document.getElementById('fromjs').value);  // t3pom2 will be changed with other related inputs and outputs
    t3po.update('t3pom2', t3po.get('t3pom2') + document.getElementById('fromjs').value);
    ...
});

function testfromt3po() { ... };  // Invoked for t3pom2, when t3pom2 is changed.
function testfromt3po13() { ... }; 