// variables
const formEntry = document.querySelector(".form-control");
const button = document.querySelector(".btn");
const div = document.querySelector(".row");
const newPar = document.createElement("p");
let minMaxPar = document.querySelector(".minMax");
let validInput;
let guessArr = [];
var maxNum;

// Prompt max number from user
while (!validInput) {
  maxNum = Math.round(
    Number(
      window.prompt("Welcome to Guess the Number! Please choose a max number.")
    )
  );

  if (!isNaN(maxNum) && maxNum > 0) {
    minMaxPar.innerHTML = `Guess a number between 1 and ${maxNum}`;
    validInput = true;
  }
}

// Generate the random number
let num = Math.floor(Math.random() * maxNum) + 1;

// Receive input from the button
button.addEventListener("click", function (e) {
  e.preventDefault();
  var guess = Math.round(Number(document.getElementById("guess").value));
  getGuess(num, guess, maxNum);
  formEntry.value = ""; //clear field
});

// Receive input from enter key
formEntry.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    button.click(); //initiates button eventlistener
  }
});

//Determine if guess is correct, display appropriate messages
function getGuess(num, guess, maxNum) {
  if (isNaN(guess)) {
    newPar.innerHTML = "That is not a number! Try again!";
  } else if (guess === num) {
    trackGuesses(guess);
    newPar.innerHTML = `You got it! It took you ${
      guessArr.length + 1
    } guesses and your guesses were: ${guessArr.join(", ")}`;
  } else if (guess < num && guess > 0) {
    newPar.innerHTML = "No, try a higher number.";
    trackGuesses(guess);
  } else if (guess > num && guess <= maxNum) {
    newPar.innerHTML = "No, try a lower number.";
    trackGuesses(guess);
  } else {
    newPar.innerHTML = "That number is not in range, please try again.";
  }
  div.appendChild(newPar);
}

//track array of guesses
function trackGuesses(guess) {
  if (guessArr.includes(guess)) {
    newPar.innerHTML =
      "That number has already been guessed! Please try again.";
  } else {
    guessArr.push(guess);
  }
}
