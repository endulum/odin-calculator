let display = ["0"];

function updateDisplay() {
    const toDisplay = display.join('');
    document.getElementById('display').textContent = toDisplay;
}

function extractNumber(event) {
    let num = event.srcElement.id;
    num = num.charAt(num.length - 1);
    if (display[0] == 0) {
        display[0] = num;
        updateDisplay();
    } else {
        display.push(num);
        updateDisplay();
    }
}

document.querySelectorAll('.number').forEach(item => {
    item.addEventListener('click', extractNumber);
})

function add(a, b) {
    return a + b
} function subtract(a, b) {
    return a - b
} function multiply(a, b) {
    return a * b
} function divide(a, b) {
    return a / b
}

// function operate(operation, a, b) {
//     return operation(a, b);
// }