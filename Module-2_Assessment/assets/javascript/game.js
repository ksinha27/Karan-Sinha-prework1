$(document).ready(function() {

  var possibleWords = ["braves", "marlins", "mets", "phillies", "nationals", "cubs", "reds", "brewers", "pirates", "cardinals", "diamondbacks", "rockies", "dodgers", "padres", "giants", "orioles", "red sox", "yankees", "rays", "blue jays", "white sox", "indians", "tigers", "royals", "twins", "astros", "angels", "athletics", "mariners", "rangers"]



//list of all the variables that will be used
  const maxGuess = 10
  var pauseGame = false


//Word Variables
  var guessingWord = []
  var guessedLetters = []

//letter variables
  var wordToMatch
  var numGuess

//Wins
  var wins = 0

  resetGame()

//game start up
  document.onkeypress = function(event) {
    //Make sure the letter entered is capitalized!!
if (isAlpha(event.key) && !pauseGame) {
      checkForLetter(event.key.toUpperCase())
    }
  }

  //Source code added for sounds!!
  function checkForLetter(letter) {
    var foundLetter = false
var correctSound = document.createElement("audio")
    var incorrectSound = document.createElement("audio")
correctSound.setAttribute("src", "assets/sounds/correct.mp3")
    incorrectSound.setAttribute("src", "assets/sounds/strike.mp3")

    // Search string for letter
    for (var i = 0, j = wordToMatch.length; i < j; i++) {
      if (letter === wordToMatch[i]) {
        guessingWord[i] = letter
        foundLetter = true
        correctSound.play()
        // If guessing word matches random word
        if (guessingWord.join("") === wordToMatch) {
          // Increment # of wins
          wins++
          pauseGame = true
          updateDisplay()
          setTimeout(resetGame, 5000)
        }
      }
    }

    if (!foundLetter) {
      incorrectSound.play()
      // Check if inccorrect guess is already on the list
      if (!guessedLetters.includes(letter)) {
        // Add incorrect letter to guessed letter list
        guessedLetters.push(letter)
        // Decrement the number of remaining guesses
        numGuess--
      }
      if (numGuess === 0) {
        // Display word before reseting game
        guessingWord = wordToMatch.split()
        pauseGame = true
        setTimeout(resetGame, 5000)
      }
    }

    updateDisplay()

  }
  // Check in keypressed is between A-Z or a-z
  function isAlpha(ch) {
    return /^[A-Z]$/i.test(ch);
  }

  function resetGame() {
    numGuess = maxGuess
    pauseGame = false

    // Get a new word
    wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
    console.log(wordToMatch)

    // Reset word arrays
    guessedLetters = []
    guessingWord = []

    // Reset the guessed word
    for (var i = 0, j = wordToMatch.length; i < j; i++) {
      // Put a space instead of an underscore between multi word "words"
      if (wordToMatch[i] === " ") {
        guessingWord.push(" ")
      } else {
        guessingWord.push("_")
      }
    }

    // Update the Display
    updateDisplay()
  }

  function updateDisplay() {
    document.getElementById("totalWins").innerText = wins
    document.getElementById("currentWord").innerText = guessingWord.join("")
    document.getElementById("remainingGuesses").innerText = numGuess
    document.getElementById("guessedLetters").innerText = guessedLetters.join(" ")
  }
})
