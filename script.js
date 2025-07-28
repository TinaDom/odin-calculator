// STEP 1: Basic arithmetic functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error"; // Prevent divide by zero
  return a / b;
}

// STEP 2: Operate function to call the correct operation
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'x':
      return multiply(a, b);
    case '÷':
      return divide(a, b);
    default:
      return null;
  }
}

// Display element
const display = document.querySelector('#display');

// Calculator state
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

// === BUTTON EVENT LISTENERS ===

// Numbers
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
  button.addEventListener('click', () => appendNumber(button.textContent));
});

// Operators
const operatorButtons = document.querySelectorAll('[data-operator]');
operatorButtons.forEach(button => {
  button.addEventListener('click', () => setOperator(button.getAttribute('data-operator')));
});

// Equals
const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', evaluate);

// Clear
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);

// Delete
const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', deleteNumber);

// Decimal
const decimalButton = Array.from(numberButtons).find(btn => btn.textContent === '.');
decimalButton.addEventListener('click', appendDecimal);

// === FUNCTIONS ===

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetScreen) resetScreen();
  display.textContent += number;
}

function resetScreen() {
  display.textContent = '';
  shouldResetScreen = false;
}

function clear() {
  display.textContent = '0';
  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
  shouldResetScreen = false;
}

function deleteNumber() {
  display.textContent = display.textContent.toString().slice(0, -1);
  if (display.textContent === '') display.textContent = '0';
}

function appendDecimal() {
  if (shouldResetScreen) resetScreen();
  if (display.textContent.includes('.')) return;
  display.textContent += '.';
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = display.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  if (currentOperator === '÷' && display.textContent === '0') {
    alert("You can't divide by 0!");
    clear();
    return;
  }
  secondOperand = display.textContent;
  const result = operate(currentOperator, firstOperand, secondOperand);
  display.textContent = Math.round(result * 1000) / 1000; // Round result
  currentOperator = null;
}