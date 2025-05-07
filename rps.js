const CHOICES = ['rock', 'paper', 'scissors'];

function getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex]
}

function getComputerChoice() {
    return getRandomChoice();
}

function getHumanChoice() {
    userInput = prompt("Rock, Paper, or Scissors: ");
    return userInput;
}

function playRound(humanChoice) {
    console.log("-------New round!------")
    computerChoice = getComputerChoice();
    humanChoice = humanChoice;

    console.log(`The computer chose: ${computerChoice}`);
    updateScreen(humanChoice, computerChoice);
    
    if (humanChoice == 'rock' && computerChoice == 'rock') {
        console.log("Rock ties with Rock. Draw!")
        return 0;
    } else if (humanChoice == 'rock' && computerChoice == 'paper') {
        console.log("Rock loses to paper, you lose!");
        return 1;
    } else if (humanChoice == 'rock' && computerChoice == 'scissors') {
        console.log("Rock beats scissors, you win!")
        return 2;
    } else if (humanChoice == 'scissors' && computerChoice == 'scissors') {
        console.log("Scissors ties with scissors. Draw!");
        return 0;
    } else if (humanChoice == 'scissors' && computerChoice == 'rock') {
        console.log("Scissors loses to paper, you lose!");
        return 1;
    } else if (humanChoice == 'scissors' && computerChoice == 'paper') {
        console.log("Scissors beats paper, you win!");
        return 2;
    } else if (humanChoice == 'paper' && computerChoice == 'paper') {
        console.log("Paper ties with paper. Draw!");
        return 0;
    } else if (humanChoice == 'paper' && computerChoice == 'scissors') {
        console.log("Paper loses to scissors, you lose!");
        return 1;
    } else if (humanChoice == 'paper' && computerChoice == 'rock') {
        console.log("Paper beats rock, you win!");
        return 2;
    }
}

function updateScreen(humanChoice, computerChoice) {
    const screen = document.querySelector(".screen");
    screen.textContent = `You chose ${humanChoice} and computer chose ${computerChoice}`;
}

function updateScore(humanScore, computerScore) {
    const human = document.querySelector(".human-score h3");
    const computer = document.querySelector(".computer-score h3");
    human.textContent = humanScore;
    computer.textContent = computerScore;
}


function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    let games = 0;
    const buttons = document.querySelectorAll("button");

    function handleClick(event) {
        const humanChoice = event.target.id;
        const result = playRound(humanChoice);
        const screen = document.querySelector(".screen");

        if (result == 1) {
            screen.textContent += " (LOSS)";
            computerScore++;
        } else if (result == 2) {
            screen.textContent += " (WIN)";
            humanScore++;
        } else {
            screen.textContent += " (DRAW)";
        }

        games++;
        updateScore(humanScore, computerScore);

        if (games === 5) {
            const resultEl = document.querySelector(".result h2");
            if (humanScore > computerScore) {
                resultEl.textContent = "YOU'RE THE WINNER!";
            } else {
                resultEl.textContent = "COMPUTER WON";
            }

            // Disable buttons to stop further clicks
            buttons.forEach(btn => btn.disabled = true);
        }

        console.log(`Current Score:\n\tUser Score: ${humanScore}\n\tComputer Score: ${computerScore}`);
    }

    buttons.forEach((button) => {
        button.addEventListener('click', handleClick);
    });
}

playGame();
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    games = 0;
    updateScore(0, 0);
    document.querySelector(".screen").textContent = "";
    document.querySelector(".result h2").textContent = "";
    
    // Re-enable buttons
    buttons.forEach(btn => btn.disabled = false);
}

const resetButton = document.createElement("button");
resetButton.textContent = "New Game";
resetButton.classList.add("new-game");
resetButton.addEventListener('click', resetGame);
document.body.appendChild(resetButton);

function updateScreen(humanChoice, computerChoice) {
    const screen = document.querySelector(".screen");
    screen.innerHTML = `
        <div class="choices-display">
            <div class="choice">You: <span class="choice-${humanChoice}">${humanChoice}</span></div>
            <div class="choice">Computer: <span class="choice-${computerChoice}">${computerChoice}</span></div>
        </div>
    `;
}
