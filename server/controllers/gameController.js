const { getGameState, getNewWord, isLetter } = require('../helpers');

const initHangmanState = {
  guessedLetters: [],
  incorrectGuesses: 0,
  failedAttempt: false,
  gameOver: false,
  points: 0,
  winner: false,
  correctWord: undefined,
};

module.exports = {
  initGame,
  newGame,
  guess,
};

//routes
async function initGame(req, res) {
  const hangman = req.session.hangman;
  if (hangman != null && req.session.wordToGuess != null) {
    res.status(200).send({ ...hangman, ...getGameState(req) });
    return;
  }
  const wordToGuess = await getNewWord();
  req.session.wordToGuess = wordToGuess;
  req.session.hangman = { ...initHangmanState, ...getGameState(req) };

  res.status(200).send({ ...req.session.hangman });
}

async function newGame(req, res) {
  const wordToGuess = await getNewWord();
  req.session.wordToGuess = wordToGuess;
  req.session.hangman = { ...initHangmanState };
  res.status(200).send({ ...req.session.hangman, ...getGameState(req) });
}

function guess(req, res) {
  const { guess } = req.body;
  const hangman = req.session.hangman;

  if (hangman == null || hangman.incorrectGuesses == null) {
    res.status(400).send({ ...hangman, session: req.session });
  }

  const guessedLetters = hangman.guessedLetters ?? [];
  const wordToGuess = req.session.wordToGuess;

  // if the guess was already guessed or
  // if the guess is not correct format
  if (
    guessedLetters.includes(guess) ||
    guess.toString().trim() === '' ||
    !isLetter.test(guess) ||
    guess.length !== 1 ||
    hangman.gameOver
  ) {
    req.session.hangman = {
      ...getGameState(req),
      failedAttempt: true,
    };
    return res.status(200).send(req.session.hangman);
  }

  //push letter to guessedLetters list
  guessedLetters.push(guess.toLowerCase());

  //if correct answer
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
          failedAttempt: false,
          guessedLetters,
        },
      );

    hangman.points += 20;

    req.session.hangman = {
      ...getGameState(req),
      ...response,
    };

    return res.status(200).send({ ...req.session.hangman });
  } else {
    //if wrong

    hangman.incorrectGuesses += 1;

    req.session.hangman = {
      ...getGameState(req),
      failedAttempt: true,
    };

    return res.status(200).send({ ...req.session.hangman });
  }
}
