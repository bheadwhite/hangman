export const actions = {
  //hangman actions
  INIT_GAME: 'INIT_GAME',
  GUESS: 'GUESS',
};

const userInitialState = {
  email: '',
};

const hangmanInitState = {
  isHead: false,
  isLeftArm: false,
  isRightArm: false,
  isBody: false,
  isLeftLeg: false,
  isRightLeg: false,
  incorrectGuesses: [],
  guessedLetters: [],
  word: '',
  gameOver: false,
  winner: false,
};

export const hangmanReducer = (state = hangmanInitState, action) => {
  switch (action.type) {
    case actions.INIT_GAME:
      return {
        ...hangmanInitState,
        ...action.payload,
        ...getBodyParts(action.payload),
      };
    case actions.GUESS:
      return { ...state, ...action.payload, ...getBodyParts(action.payload) };
    default:
      return state;
  }
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const getBodyParts = (hangmanGame) => {
  const incorrect = hangmanGame.incorrectGuesses;
  let parts = {};
  if (incorrect >= 1) parts.isHead = true;
  if (incorrect >= 2) parts.isBody = true;
  if (incorrect >= 3) parts.isLeftArm = true;
  if (incorrect >= 4) parts.isRightArm = true;
  if (incorrect >= 5) parts.isLeftLeg = true;
  if (incorrect >= 6) parts.isRightLeg = true;
  return { ...parts };
};
