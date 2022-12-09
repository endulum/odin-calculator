let memory = {
    current: ['0'],
    previous: '',
    operation: '',
}; console.log(memory.current.join(''));

let inputFlag = true;

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
            } 
        }
        console.log(memory.current.join(''));
    });
});

document.querySelectorAll('.operation').forEach(item => {
    item.addEventListener('click', (event) => {
        memory.operation = event.target.id;
        if (memory.previous == '') {
            memory.previous = parseFloat(memory.current.join(''));
        } else {
            memory.previous = evaluation(memory);
        };
        memory.current = ['0'];
        console.log(memory.previous);
    })
})

document.getElementById('clearEntry').addEventListener('click', () => {
    memory.current = ['0'];
    console.log(memory.current.join(''));
});

function evaluation(memory) {
    let a = memory.previous;
    let b = parseFloat(memory.current.join(''));
    switch (memory.operation) {
        case "divide": return a / b;
        case "subtract": return a - b;
        case "add": return a + b;
        case "multiply": return a * b;
    }
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
//     console.log(operation);
//     console.log(operate(operation, 4, 5));
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

// console.log(operate(sum, 4, 5));