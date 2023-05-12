//// Initialize variables, including an array of random numbers, target numbers, selected numbers, selected operators, number of wins and failures
let numbers = [];
let target = 0;
let chosenNumbers = [];
let chosenOperator = '';
let wins = 0;
let losses = 0;

function startGame() {
    // Generate four random numbers in the range of -10 to 10
    numbers = [...Array(4)].map(() => Math.floor(Math.random() * 21) - 10);


    // Generate a target number, also in the range of -10 to 10
    target = Math.floor(Math.random() * 21 -10);

    // Clear the chosen numbers and operator
    chosenNumbers = [];
    chosenOperator = '';

    // Display the numbers as buttons
    updateNumbers();

    // Display the target
    document.querySelector("#target").textContent = target;

    // Clear the operation history
    document.querySelector("#results").textContent = '';
    document.querySelector("#current-operation").textContent = '';
}

//Generate a new number button and add a click event
function updateNumbers() {
    const numbersDiv = document.querySelector("#numbers");
    numbersDiv.textContent = ''; // Clear the previous numbers
    numbers.forEach((number) => {
        const button = document.createElement("button");
        button.textContent = number;
        button.addEventListener("click", function() {
            if (chosenNumbers.length < 2) {
                chosenNumbers.push(number);
                numbers = numbers.filter(n => n !== number); // Remove used number
                this.remove(); // Remove the button
                updateDisplay();
            }
        });
        numbersDiv.appendChild(button);
    });
}

//Update the current operation display
function updateDisplay() {
    let display = '';
    if (chosenNumbers.length > 0) {
        display += chosenNumbers[0];
    }
    if (chosenOperator) {
        display += ' ' + chosenOperator;
        if (chosenNumbers.length > 1) {
            display += ' ' + chosenNumbers[1];
        }
    }
    document.querySelector("#current-operation").textContent = display;
}

// Create the operator's button and add a click event
const operators = ['+', '-', '*'];
operators.forEach((operator) => {
    const button = document.createElement("button");
    button.textContent = operator;
    button.addEventListener("click", function() {
        if (!chosenOperator && chosenNumbers.length === 1) {
            chosenOperator = operator;
            updateDisplay();
        }
    });
    document.querySelector("#input-area").appendChild(button);
});

// Add a click event for the "Calculate" button
document.querySelector("#calculate").addEventListener("click", function() {
    let message = document.querySelector("#message");
    if (chosenNumbers.length === 2 && chosenOperator) {
        let result;
        // Perform the operation
        if (chosenOperator === "+") {
            result = chosenNumbers[0] + chosenNumbers[1];
        } else if (chosenOperator === "-") {
            result = chosenNumbers[0] - chosenNumbers[1];
        } else if (chosenOperator === "*") {
            result = chosenNumbers[0] * chosenNumbers[1];
        }

        // Display the new result in a new paragraph
        const newParagraph = document.createElement("p");
        newParagraph.textContent = `${chosenNumbers[0]} ${chosenOperator} ${chosenNumbers[1]} = ${result}`;
        document.querySelector("#results").appendChild(newParagraph);

        // Clear the chosen numbers and operator
        chosenNumbers = [];
        chosenOperator = '';
        document.querySelector("#current-operation").textContent = '';

        // If only two numbers left, check the result immediately
        if (numbers.length === 0) {
            if (result === target) {
                wins++;
                message.textContent = 'you win!';
            } else {
                losses++;
                message.textContent = 'You failed';
            }
            document.querySelector("#wins").textContent = wins;
            document.querySelector("#losses").textContent = losses;
        } else {
            // Add result back to numbers list
            numbers.push(result);
            updateNumbers();
        }
    } else {
        message.textContent = 'error';
    }
});

// Add a click event for the "Restart" button
document.querySelector("#restart").addEventListener("click", function() {
    startGame();
});

// Start the game
startGame();
