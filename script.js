let memory = {
    current: ['0'],
    previous: '',
    operation: '',
};

let inputFlag = false;
let evaluationFlag = false;

const display = document.getElementById('display');
function updateDisplay(textcontent) {
    display.textContent = textcontent;
};

updateDisplay(memory.current.join(''));

document.querySelectorAll('.number').forEach(item => {
    item.addEventListener('click', (event) => {

        if (evaluationFlag == true) {
            wipeMemory(memory);
            evaluationFlag = false;
        };
        
        if (event.target.id == 'decimal') {
            if (memory.current.includes('.') != true) {
                memory.current.push('.');
                console.log(memory.current.join(''));
            }
        } else {
            let num = event.target.id.charAt(event.target.id.length - 1);
            if (memory.current.join('') === "0") {
                memory.current[0] = num;
            } else {
                memory.current.push(num);
            };
        }; 
        
        if (inputFlag == false) {inputFlag = true;};
        updateDisplay(memory.current.join(''));
    });
});

document.querySelectorAll('.operation').forEach(item => {
    item.addEventListener('click', (event) => {
        if (evaluationFlag == true) {evaluationFlag = false;};
        if (inputFlag == true) {
            if (memory.previous == '') {
                memory.previous = parseFloat(memory.current.join(''));
            } else {
                memory.previous = evaluation(memory);
            } 
            memory.operation = event.target.id;
            memory.current = ['0'];
            inputFlag = false;
        } else {
            memory.operation = event.target.id;
        }
        updateDisplay(memory.previous);
    });
});

document.getElementById('clearEntry').addEventListener('click', () => {
    memory.current = ['0'];
    updateDisplay(memory.current.join(''));
});

document.getElementById('equals').addEventListener('click', () => {
    if (inputFlag == true) {
        memory.current = parseFloat(memory.current.join(''));
        updateDisplay(evaluation(memory));
        evaluationFlag = true;
    };
});

document.getElementById('clearAll').addEventListener('click', () => {
    wipeMemory(memory);
    updateDisplay(memory.current.join(''));
});

document.getElementById('backspace').addEventListener('click', () => {
    memory.current.pop();
    updateDisplay(memory.current.join(''));
});

document.getElementById('changeSign').addEventListener('click', () => {
    if (memory.current.join('') != "0") {
        if (memory.current.includes('-') != true) {
            memory.current.unshift("-");
        } else {
            memory.current.shift();
        }
    }; updateDisplay(memory.current.join(''));
});

function evaluation(memory) {
    let a = memory.previous;
    let b = null;
    if (typeof memory.current == "number") {
        b = memory.current;
    } else {
        b = parseFloat(memory.current.join(''));
    }
    switch (memory.operation) {
        case "divide": return a / b;
        case "subtract": return a - b;
        case "add": return a + b;
        case "multiply": return a * b;
    };
};

function wipeMemory(memory) {
    memory.current = ['0'];
    memory.previous = '';
    memory.operation = '';
    inputFlag = false;
}