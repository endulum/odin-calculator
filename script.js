// STILL BUGGY. WORK OUT THE KINKS FIRST

let memory = {
    current: ['0'],
    previous: '',
    operation: '',
    evaluate: function() {
        let a = this.previous;
        let b = null; // for some reason it doesn't work if i don't include this
        if (typeof this.current == "number") {b = this.current;}
        else {b = parseFloat(this.current.join(''));};
        switch (this.operation) {
            case "divide": return a / b;
            case "subtract": return a - b;
            case "add": return a + b;
            case "multiply": return a * b;
        };
    }, 
    wipe: function() {
        this.current = ['0'];
        this.previous = '';
        this.operation = '';
    }
}; let flags = {
    input: false,
    evaluation: false,
    reset: function() {
        this.input = false;
        this.evaluation = false;
    }
}

const display = document.getElementById('display');
function updateDisplay(textcontent) {
    display.textContent = textcontent;
}; updateDisplay(memory.current.join(''));

document.querySelectorAll('.number').forEach(item => {
    item.addEventListener('click', (event) => {
        if (flags.evaluation == true) {
            memory.wipe();
            flags.evaluation = false;
        }
        if (event.target.id == "decimal") {
            if (memory.current.includes('.') != true) {
                memory.current.push('.');
            }
        } else if (event.target.id == "changeSign") {
            if (memory.current.join('') != "0") {
                memory.current.includes('-') ? memory.current.shift() : memory.current.unshift("-") ;
            }
        } else {
            const num = event.target.id.charAt(event.target.id.length - 1);
            memory.current.join('') === "0" ? memory.current[0] = num : memory.current.push(num);
        };
        updateDisplay(memory.current.join(''));
        flags.input = true;
    });
});

document.querySelectorAll('.operation').forEach(item => {
    item.addEventListener('click', (event) => {
        if (flags.evaluation == true) {flags.evaluation = false;};
        if (flags.input == true) {
            memory.previous == '' ? memory.previous = parseFloat(memory.current.join('')) : memory.previous = memory.evaluate();
            memory.operation = event.target.id;
            memory.current = ['0'];
            flags.input = false;
        } else {
            memory.operation = event.target.id;
        }; updateDisplay(memory.previous);
        item.classList.add('selected');
    });
});

document.querySelectorAll('.control').forEach(item => {
    item.addEventListener('click', (event) => {
        switch (event.target.id) {
            case "clearEntry": memory.current = ['0']; flags.input = false; break;
            case "clearAll": memory.wipe(); flags.reset(); break;
            case "backspace":
                if (memory.current.length >= 2) {
                    memory.current.pop(); 
                    break;
                } else if (memory.current.length = 2 && memory.current.includes('-')) {
                    memory.current = ['-','0'];
                    break;
                } else {
                    memory.current = ['0'];
                    flags.input = false;
                    break;
                };
        }; 
        updateDisplay(memory.current.join(''));
    });
});

document.getElementById('equals').addEventListener('click', () => {
    if (flags.input == true && memory.previous != '') {
        if (memory.operation == 'divide' && memory.current.join('') == 0) {
            updateDisplay("NICE TRY");
        } else {
            memory.current = parseFloat(memory.current.join(''));
            updateDisplay(memory.evaluate());
            memory.previous = memory.evaluate();
        };
        memory.current = ['0'];
        flags.evaluation = true;
        flags.input = false; // remove if buggy
    };
});


// FOR DEBUGGING
// document.body.addEventListener('click', () => {
//     if (typeof memory.current == "number") {
//         document.getElementById('memcur').textContent = memory.current;
//     } else {document.getElementById('memcur').textContent = memory.current.join('');}
//     document.getElementById('memprev').textContent = memory.previous;
//     document.getElementById('memop').textContent = memory.operation;
//     document.getElementById('flaginp').textContent = flags.input;
//     document.getElementById('flageval').textContent = flags.evaluation;
// });