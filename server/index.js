const express = require('express');
const app = express();
const axios = require('axios');
const session = require('express-session');
const path = require('path');

const initHangmanState = {
  guessedLetters: [],
  incorrectGuesses: 0,
  gameOver: false,
};

app.use(
  express.json(),
  session({
    saveUninitialized: true,
    secret: 'asdlfkjasdlkfj',
    resave: false,
    cookie: {
      secure: false,
    },
  }),
  express.static(path.join(__dirname, '..', 'build')),
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
const WORD_URL = 'https://random-word-api.herokuapp.com/word?number=1';
const isLetterRegex = /[a-zA-Z]/;
const isLetter = new RegExp(isLetterRegex);

const getNewWord = () => {
  return new Promise((res, rej) => {
    return axios.get(WORD_URL).then((response) => {
      res(response.data[0]);
    });
  });
};

const getGameState = (req) => {
  const { word, incorrectGuesses } = req.session.hangman;
  const gameState = {};
  const converted = convertVisibleLetters(req);

  if (incorrectGuesses >= 6) {
    gameState.gameOver = true;
    gameState.correctWord = req.session.hangman.word;
  }
  gameState.word = converted;
  gameState.winner = word === converted;

  return gameState;
};

const convertVisibleLetters = (req) => {
  const { guessedLetters, word } = req.session.hangman;
  return word
    .split('')
    .map((i) => {
      if (i.trim() === '') {
        return `&nbsp`;
      }

      if (guessedLetters.includes(i.toLowerCase())) {
        return i;
      } else {
        return '_';
      }
    })
    .join('');
};

//head body right left right left

app.get(`/api/initGame`, async (req, res) => {
  if (req.session.hangman != null) {
    res.status(200).send({ ...req.session.hangman, ...getGameState(req) });
    return;
  }
  const word = await getNewWord();
  req.session.hangman = { ...initHangmanState, word };

  console.log('word', word);

  res.status(200).send({ ...req.session.hangman, ...getGameState(req) });
});

app.get(`/api/newGame`, async (req, res) => {
  const word = await getNewWord();
  req.session.hangman = { ...initHangmanState, word };
  res.status(200).send({ ...initHangmanState, ...getGameState(req) });
});

app.post(`/api/guess`, (req, res) => {
  const { guess } = req.body;
  const { incorrectGuesses, word, guessedLetters } = req.session.hangman;
  // if the guess was already guessed
  console.log('guess', guess, 'session.hangman', req.session.hangman);
  if (
    guessedLetters.includes(guess) ||
    guess.toString().trim() === '' ||
    !isLetter.test(guess) ||
    guess.length !== 1 ||
    req.session.hangman.gameOver
  ) {
    res.status(200).send({
      ...req.session.hangman,
      failedAttempt: true,
      incorrectGuesses,
      guessedLetters,
      ...getGameState(req),
    });
    return;
  }
  //push letter to guessedLetters list
  guessedLetters.push(guess.toLowerCase());

  if (word.toLowerCase().includes(guess)) {
    const response = word
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
        { ...req.session.hangman, failedAttempt: false, guessedLetters },
      );

    res.status(200).send({
      ...req.session.hangman,
      ...response,
      incorrectGuesses,
      ...getGameState(req),
    });
    return;
  } else {
    //if wrong
    req.session.hangman.incorrectGuesses += 1;

    res.status(200).send({
      ...req.session.hangman,
      failedAttempt: true,
      incorrectGuesses: req.session.hangman.incorrectGuesses,
      guessedLetters,
      ...getGameState(req),
    });
    return;
  }
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
