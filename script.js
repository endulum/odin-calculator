let memory = {
    current: ['0'],
    previous: '',
    operation: '',
};

let inputFlag = false;

const display = document.getElementById('display');
function updateDisplay(textcontent) {
    display.textContent = textcontent;
};

updateDisplay(memory.current.join(''));

document.querySelectorAll('.number').forEach(item => {
    item.addEventListener('click', (event) => {
        if (event.target.id == 'decimal') {
            memory.current.push('.');
        } else {
            let num = event.target.id.charAt(event.target.id.length - 1);
            if (memory.current.join('') == "0") {
                memory.current[0] = num;
            } else {
                memory.current.push(num);
            };
        }; if (inputFlag == false) {inputFlag = true;};
        updateDisplay(memory.current.join(''));
    });
});

document.querySelectorAll('.operation').forEach(item => {
    item.addEventListener('click', (event) => {
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
    };
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



// let display = ["0"];

// function updateDisplay() {
//     const toDisplay = display.join('');
//     document.getElementById('display').textContent = toDisplay;
// }

// function extractNumber(event) {
//     let num = event.srcElement.id;
//     num = num.charAt(num.length - 1);
//     if (display[0] == 0) {
//         display[0] = num;
//         updateDisplay();
//     } else {
//         display.push(num);
//         updateDisplay();
//     }
// } function extractOperation(event) {
//     let operation = event.srcElement.id;
//     updateDisplay(operation);
//     updateDisplay(operate(operation, 4, 5));
// }

// document.querySelectorAll('.number').forEach(item => {
//     item.addEventListener('click', extractNumber);
// }); document.querySelectorAll('.operation').forEach(item => {
//     item.addEventListener('click', extractOperation);
// })

// function add(a, b) {
//     return a + b
// } function subtract(a, b) {
//     return a - b
// } function multiply(a, b) {
//     return a * b
// } function divide(a, b) {
//     return a / b
// }

// function operate(operation, a, b) {
//     return operation(a, b);
// } 

// updateDisplay(operate(sum, 4, 5));