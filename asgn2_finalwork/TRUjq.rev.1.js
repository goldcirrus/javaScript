var TRUjQ = function (x) {
    if (x == document) {
        return {
            ready: function(callback) {
                window.addEventListener('load', function(eobj) {
                    x.__callback__ = callback;
                    x.__callback__(eobj);
                })
            },
            on: function(etype, callback) {
                x.addEventListener(etype, function(eobj) {
                    x.__callback__ = callback;
                    x.__callback__(eobj);
                })
            },
            click: function(callback) {
                x.addEventListener("click", function(eobj) {
                    x.__callback__ = callback;
                    x.__callback__(eobj);
                })
            },
            dblclick: function(callback) {
                x.addEventListener("dblclick", function(eobj) {
                    x.__callback__ = callback;
                    x.__callback__(eobj);
                })
            }
        }
    }
    else if (typeof x == 'string' || x instanceof HTMLElement) {
        let elements = [];
        if (x instanceof HTMLElement)
            elements.push(x);
        else {
            x = x.trim();
            elements = document.querySelectorAll(x);
        }
        return {
            on: function(etype, callback) {
                for (let i = 0; i < elements.length; i++) {
                    elements[i].addEventListener(etype, function(eobj) {
                        elements[i].__callback__ = callback;
                        elements[i].__callback__(eobj);
                    })
                }
            },
            click: function(callback) {
                for (let i = 0; i < elements.length; i++) {
                    elements[i].addEventListener('click', function(eobj) {
                        elements[i].__callback__ = callback;
                        elements[i].__callback__(eobj);
                    })
                }
            },
            dblclick: function(callback) {
                for (let i = 0; i < elements.length; i++) {
                    elements[i].addEventListener('dblclick', function(eobj) {
                        elements[i].__callback__ = callback;
                        elements[i].__callback__(eobj);
                    })
                }
            },
            hide: function() {
                for (let i = 0; i < elements.length; i++)
                    elements[i].style.display = "none";
            },
            css: function(property, value) {
                for (let i = 0; i < elements.length; i++)
                    if (value == undefined)
                        return window.getComputedStyle(elements[i])[property];
                    else
                        elements[i].style[property] = value;
            },
            fadeIn: function() {
                for (let i = 0; i < elements.length; i++) {
                    let opacity = 0;
                    elements[i].style['opacity'] = opacity;
                    elements[i].style.display = 'block';
                    let timer = window.setInterval(function() {
                            elements[i].style['opacity'] = opacity;
                            opacity += 0.05;
                            if (opacity >= 1)
                                window.clearInterval(timer);
                        }, 100);
                }
            }
        }
    }
    else {
        return null;
    }
};

TRUjQ.version = '1.0.0';