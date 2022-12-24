const entering = document.querySelector("#entering");
const calculating = document.querySelector("#calculating");
const allDigits = Array.from(document.querySelectorAll(".digit"));

// all the non-digit buttons
const clearButton = document.querySelector("#clearButton");
const deleteButton = document.querySelector("#deleteButton");
const allOperators = Array.from(document.querySelectorAll(".operator"));
const divideButton = document.querySelector("#divideButton");
const multiplyButton = document.querySelector("#multiplyButton");
const subtractButton = document.querySelector("#subtractButton");
const addButton = document.querySelector("#addButton");
const equalsButton = document.querySelector("#equalsButton");


// initializing basics for calculator
let operandFirst = 0;
let operandSecond = 0;
let operator = "";

allDigits.forEach(each => each.addEventListener("click", () => {
    entering.textContent === "hello" ? updateScreen(each.textContent) : updateScreen(entering.textContent += each.textContent);
}));

clearButton.addEventListener("click", () => {
    updateScreen("hello");
    updateCalculating("");
    operandFirst = 0;
    operandSecond = 0;
    operator = "";
});

deleteButton.addEventListener("click", () => {
    if (entering.textContent !== "hello") {
        entering.textContent = entering.textContent.slice(0,entering.textContent.length - 1);
        if (entering.textContent === "" && calculating.textContent === "") {
            updateScreen("hello");
        }
    }
});

// different operators
allOperators.forEach(each => each.addEventListener("click", () => {
    updateOperator(each.textContent);
}));
function updateOperator(selected) {
    operator = selected;
    operandFirst = Number(entering.textContent);
    updateCalculating(operandFirst + operator);
    updateScreen("");
    console.log(`Operator is now ${operator}`);
}


equalsButton.addEventListener("click", () => {
    switch (operator) {
        case "":
            break;
        case "+":
            operandSecond = Number(entering.textContent);
            updateCalculating(calculating.textContent + operandSecond);
            updateScreen((operandFirst + operandSecond).toString());
            break;
        case "-":
            operandSecond = Number(entering.textContent);
            updateCalculating(calculating.textContent + operandSecond);
            updateScreen((operandFirst - operandSecond).toString());
            break;
        case "x":
            operandSecond = Number(entering.textContent);
            updateCalculating(calculating.textContent + operandSecond);
            updateScreen((operandFirst * operandSecond).toString());
            break;
        case "÷":
            operandSecond = Number(entering.textContent);
            updateCalculating(calculating.textContent + operandSecond);
            updateScreen((operandFirst / operandSecond).toString());
            break;
    }

    operandFirst = 0;
    operandSecond = 0;
    operator ="";
})

// updates parts of the screen with the given string
function updateScreen(string) {
    entering.textContent = string;
}

function updateCalculating(string) {
    calculating.textContent = string;
}