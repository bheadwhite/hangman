const axios = require('axios');
const WORD_URL = 'https://random-word-form.herokuapp.com/random/noun/a';
const isLetterRegex = /[a-zA-Z]/;
const isLetter = new RegExp(isLetterRegex);

module.exports = {
  isLetter,
  getGameState,
  convertVisibleLetters,
  getNewWord,
  calculateBonus,
};
//helpers
function getGameState(req) {
  const incorrectGuesses = req.session.hangman?.incorrectGuesses ?? 0;
  const wordToGuess = req.session.wordToGuess;
  const gameState = {
    ...req.session.hangman,
  };
  const converted = convertVisibleLetters(req);

  if (incorrectGuesses >= 6) {
    gameState.gameOver = true;
    gameState.correctWord = req.session.wordToGuess;
  }

  gameState.convertedWord = converted;
  gameState.winner = wordToGuess === converted;

  if (gameState.winner) {
    const bonus = calculateBonus(req.session.hangman);
    const points = bonus + req.session.hangman.points;
    gameState.points = points;
  }

  return gameState;
}

function convertVisibleLetters(req) {
  const guessedLetters = req.session.hangman?.guessedLetters ?? [];
  const wordToGuess = req.session.wordToGuess ?? '';
  const visible = wordToGuess
    .split('')
    .map((i) => {
      if (i.trim() === '') {
        return `&nbsp`;
      }

      if (!isLetter.test(i)) {
        return i;
      }

      if (guessedLetters.includes(i.toLowerCase())) {
        return i;
      } else {
        return '_';
      }
    })
    .join('');

  return visible;
}

function getNewWord() {
  return new Promise((res, rej) => {
    return axios.get(WORD_URL).then((response) => {
      res(response.data[0]);
    });
  });
}

function calculateBonus(hangmanState) {
  //50 points bonus for each body part remaining on hangman
  const bodyPartsRemaining = 6 - hangmanState.incorrectGuesses;
  return bodyPartsRemaining * 50;
}
