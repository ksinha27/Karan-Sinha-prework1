$(document).ready(function() {

      var wordBank = ["braves", "marlins", "mets", "phillies", "nationals", "cubs", "reds", "brewers", "pirates", "cardinals", "diamondbacks", "rockies", "dodgers", "padres", "giants", "orioles", "red sox", "yankees", "rays", "blue jays", "white sox", "indians", "tigers", "royals", "twins", "astros", "angels", "athletics", "mariners", "rangers"]


      const maxGuess = 10
      var pauseGame = false

      var lettersGuessed = []
      var guessingWord = []
      var wordToMatch
      var numGuess
      var wins = 0

      resetGame()

      //key pressed

      document.onkeypress = function(event) {
        if (isAlpha(event.key) && !pauseGame) {
          checkForLetter(event.key.toUpperCase())
        }
      }

      //Is the guessed letter in the word?
      function checkForLetter(letter) {
        var foundLetter = false
        var correctSound = document.createElement("audio")
        var incorrectSound = document.createElement("audio")
        correctSound.setAttribute("src", "assets/sounds/correct.mp3")
        incorrectSound.setAttribute("src", "assets/sounds/strike.mp3")

        //is the letter here? (J is used bc of 10 letter limit)
        for (var i = 0, j = wordToMatch.length; i < j; i++) {
          if (letter === wordToMatch[i]) {
            guessingWord[i] = letter
            foundLetter = true
            correctSound.play()

            if (guessingWord.join("") === wordToMatch) {
              //Win total increases on display
              wins++
              pauseGame = true
              updateDisplay()
              setTimeout(resetGame, 5000)
            }
          }
        }

        if (!foundLetter) {
          incorrectSound.play()
          //Is the incorrectly guessed letter already on the list?
          if (!lettersGuessed.includes(letter)) {
            //letter is added to the list of guessed lettersGuessed
            lettersGuessed.push(letter)
            //list of guesses Remaining
            numGuess--
          }
          if (numGuess === 0) {
            //show the word before the game resets
            guessingWord = wordToMatch.split()
            pauseGame = true
            setTimeout(resetGame, 5000)
          }
        }

        updateDisplay()

        //make sure the letter is between a and Z (inclusive of all upper and lower case)
        function isAlpha(ch) {
          return /^[A-Z]$/i.test(ch);

          function resetGame() {
            numGuess = maxGuess
            pauseGame = false


            //Resetting the word
            wordToMatch = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase()
            console.log(wordToMatch)

            //Reset wordBank
            lettersGuessed = []
            guessingWord = []

            //Reset the word thats been Guessed

            for (var i = 0, j = wordToMatch.length; i < j; i++) {
              if (wordTomatch[i] === " ") {
                guessingWord.push(" ")
              } else {
                guessingWord.push("_")
              }
            }

            //Display update
            updateDisplay()

          }

function updateDisplay (){
  document.getElementById("winTotal").innerText = wins
  document.getElementById("currentWord").innerText = guessingWord.join("")
  document.getElementById("guessesRemaining").innerText = numGuess
  document.getElementById("lettersGuessed").innerText = guessedLetters.join(" ")
}


        })
