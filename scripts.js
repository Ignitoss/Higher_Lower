// variables
const formEntry = document.getElementById("guess");
const guessBtn = document.getElementById("guessBtn");
const div = document.getElementById("mainLayout");
const formLayout = document.getElementById("formLayout");
const newPar = document.createElement("p");
const reloadBtn = document.createElement("button");
const formTag = document.getElementById("form");
let minMaxPar = document.getElementById("minMax");
let validInput = false;
let maxNum, randomNum;
let guessArr = [];

// Prompt max number from user
while (!validInput) {
  maxNum = Math.round(
    Number(
      window.prompt(
        "Welcome to Guess the Number! Please choose a max number to play."
      )
    )
  );

  if (!isNaN(maxNum) && maxNum <= Number.MAX_VALUE && maxNum > 0) {
    minMaxPar.innerHTML = `Guess a number between 1 and ${maxNum}`;
    validInput = true;
  }
}

// Generate the random number
randomNum = Math.floor(Math.random() * maxNum) + 1;

// Receive input from the button
guessBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let guess = Math.round(Number(document.getElementById("guess").value));
  getGuess(randomNum, guess, maxNum);
  formEntry.value = ""; //clear field
});

// Receive input from 'enter' key
formEntry.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    guessBtn.click(); //initiates button eventlistener
  }
});

//Determine guess success or failure, display appropriate messages
function getGuess(randomNum, guess, maxNum) {
  if (isNaN(guess)) {
    newPar.innerHTML = "That is not a number! Try again!";
  } else if (guessArr.includes(guess)) {
    newPar.innerHTML = `${guess} has already been guessed! Please try again.`;
  } else if (guess === randomNum) {
    gameWon();
    guessArr.push(guess);
    if (guessArr.length === 1) {
      newPar.innerHTML = `You got it! It took you ${guessArr.length} guess and your guess was: ${guessArr}.`;
    } else {
      newPar.innerHTML = `You got it! It took you ${
        guessArr.length
      } guesses and your guesses were: ${guessArr.join(", ")}.`;
    }
  } else if (guess < randomNum && guess > 0) {
    guessArr.push(guess);
    newPar.innerHTML = "No, try a higher number.";
  } else if (guess > randomNum && guess <= maxNum) {
    guessArr.push(guess);
    newPar.innerHTML = "No, try a lower number.";
  } else {
    newPar.innerHTML = "That number is not in range, please try again.";
  }
  div.appendChild(newPar);
}

// manage clearing and adding DOM elements after success
function gameWon() {
  minMaxPar.remove();
  guessBtn.remove();
  formTag.remove();
  reloadBtn.innerHTML = "Start New Game";
  reloadBtn.classList.add("btn", "btn-primary");
  formLayout.appendChild(reloadBtn);
  reloadBtn.addEventListener("click", function (e) {
    e.preventDefault();
    location.reload(); //reloads the page to restart game
  });
}
