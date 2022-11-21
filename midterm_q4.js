let inputs = document.querySelectorAll('input[trujs-model]');

for (let i = 0; i < inputs.length; i++) {
    let m = inputs[i].getAttribute('trujs-model').split(/, */);
    $trujs[m] = inputs[i].value.trim();

    for (let j = 0; j < $trujs._expressions[m].length; j++) { 
        let span = $trujs._expressions[m][j];
        span.object.innerHTML = eval(span.expression);
    }
}

