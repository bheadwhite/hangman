const axios = require('axios');
const WORD_URL = 'https://random-word-form.herokuapp.com/random/noun/a';
const isLetterRegex = /[a-zA-Z]/;
const isLetter = new RegExp(isLetterRegex);

//routes
const initGame = async (req, res) => {
  if (req.session.hangman != null && req.session.wordToGuess != null) {
    res.status(200).send({ ...req.session.hangman, ...getGameState(req) });
    return;
  }
  const wordToGuess = await getNewWord();
  req.session.wordToGuess = wordToGuess;
  req.session.hangman = { ...initHangmanState, ...getGameState(req) };

  res.status(200).send({ ...req.session.hangman });
};

const newGame = async (req, res) => {
  const wordToGuess = await getNewWord();
  req.session.wordToGuess = wordToGuess;
  req.session.hangman = { ...initHangmanState };
  res.status(200).send({ ...req.session.hangman, ...getGameState(req) });
};

const guess = (req, res) => {
  const { guess } = req.body;

  if (
    req.session.hangman == null ||
    req.session.hangman.incorrectGuesses == null
  ) {
    res.status(400).send(req.session.hangman, req.session);
  }

  const { incorrectGuesses, guessedLetters } = req.session.hangman;
  const wordToGuess = req.session.wordToGuess;

  // if the guess was already guessed
  if (
    guessedLetters.includes(guess) ||
    guess.toString().trim() === '' ||
    !isLetter.test(guess) ||
    guess.length !== 1 ||
    req.session.hangman.gameOver
  ) {
    req.session.hangman = {
      ...req.session.hangman,
      failedAttempt: true,
      incorrectGuesses,
      guessedLetters,
      ...getGameState(req),
    };
    res.status(200).send(req.session.hangman);
    return;
  }
  //push letter to guessedLetters list
  guessedLetters.push(guess.toLowerCase());

  if (wordToGuess.toLowerCase().includes(guess.toLowerCase())) {
    const response = wordToGuess
      .toLowerCase()
      .split('')
      .reduce(
        (a, i, index) => {
          if (guessedLetters.includes(i)) {
            if (a[i] == null) {
              a[i] = [];
            }
            a[i].push(index);
          }
          return a;
        },
        {
          ...req.session.hangman,
          failedAttempt: false,
          guessedLetters,
        },
      );

    req.session.hangman = {
      ...req.session.hangman,
      ...response,
      incorrectGuesses,
      ...getGameState(req),
    };

    res.status(200).send(req.session.hangman);
    return;
  } else {
    //if wrong
    req.session.hangman = {
      ...req.session.hangman,
      failedAttempt: true,
      incorrectGuesses: ++req.session.hangman.incorrectGuesses,
      guessedLetters,
      ...getGameState(req),
    };
    res.status(200).send(req.session.hangman);
    return;
  }
};

module.exports = {
  initGame,
  newGame,
  guess,
};

const initHangmanState = {
  guessedLetters: [],
  incorrectGuesses: 0,
  failedAttempt: false,
  gameOver: false,
  points: 0,
  winner: false,
  wordDisplay: '',
  correctWord: undefined,
};

function calculateBonus(hangmanState) {
  //50 points bonus for each body part remaining on hangman
  const bodyPartsRemaining = 6 - hangmanState.incorrectGuesses;
  return bodyPartsRemaining * 50;
}

//helpers
function getGameState(req) {
  const incorrectGuesses = req.session.hangman?.incorrectGuesses ?? 0;
  const wordToGuess = req.session.wordToGuess;
  const gameState = {};
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
