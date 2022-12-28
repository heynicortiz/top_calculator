const current = document.querySelector("#current");
const previous = document.querySelector("#previous");
const allDigits = Array.from(document.querySelectorAll(".digit"));
const operatorList = ["+", "-", "x", "÷"];

// all the non-digit buttons
const clearButton = document.querySelector("#clearButton");
const deleteButton = document.querySelector("#deleteButton");
const decimalButton = document.querySelector("#decimalButton");
const allOperators = Array.from(document.querySelectorAll(".operator"));
const equalsButton = document.querySelector("#equalsButton");

// initializing basics for calculator
let operandFirst = null;
let operandSecond = null;
let operator = null;

// update visuals
function chgLower(string) {
    current.textContent = string;
}

function chgUpper(string) {
    previous.textContent = string;
}

clearButton.addEventListener("click", () => {
    chgLower("hello");
    chgUpper("");
    operandFirst = null;
    operandSecond = null;
    operator = null;
    chgLower("hello");
});

deleteButton.addEventListener("click", () => {
    if (current.textContent !== "hello" && current.textContent !== "oh no you don't!") {
        current.textContent = current.textContent.slice(0,-1);
        if (current.textContent === "" && previous.textContent === "") {
            chgLower("hello");
        }
    }
});

allDigits.forEach(each => each.addEventListener("click", () => {
    addDigit(each.textContent);
}));

decimalButton.addEventListener("click", () => {
    if (!current.textContent.includes(".")) {
        addDigit(".")
    }
})

function addDigit(digit) {
    current.textContent === "hello" || current.textContent === "oh no you don't!" ? chgLower(digit) : chgLower(current.textContent + digit);
}

// do math
function add(first, second) {
    return first + second;
}

function subtract(first, second) {
    return first - second;
}

function divide(first, second) {
    return first / second;
}

function multiply(first, second) {
    return first * second;
}

function operate(first, second, operatorToDo) {
    let result;
    first = Number(first);
    second = Number(second);
    switch (operatorToDo) {
        case "":
            break;
        case "+":
            result = add(first, second);
            break;
        case "-":
            result = subtract(first, second);
            break;
        case "x":
            result = multiply(first, second);
            break;
        case "÷":
            if (second === 0) {
                clearButton.click();
                chgLower("oh no you don't!");
                return;
            } else {
                result = divide(first, second);
            }
            break;
    }

    operandFirst = result;
    operandSecond = null;
    operator = null;

    return result;
}

function updateOperator(selectedOperator) {
    if (current.textContent !== "hello" && current.textContent !== "oh no you don't!") {
        if (operandFirst == null) {
            operandFirst = current.textContent;
            operator = selectedOperator;
            chgUpper(operandFirst + operator);
            chgLower("");
        } else if (operator == null) {
            operator = selectedOperator;
            chgUpper(operandFirst + operator);
            chgLower("");
        } else {
            if (operator === "÷" && current.textContent === "0") {
                clearButton.click();
                chgLower("oh no you don't!");
                return;
            }
            equalsButton.click();
            operator = selectedOperator;
            chgUpper(operandFirst + operator);
            chgLower("");
        }
    }
}
allOperators.forEach(each => each.addEventListener("click", () => {
    updateOperator(each.textContent);
}))

equalsButton.addEventListener("click", () => {
    if (current.textContent !== "hello" && current.textContent !== "oh no you don't!") {
        operandSecond = current.textContent;
        chgLower("");
        chgUpper(operate(operandFirst, operandSecond, operator));
    }
})