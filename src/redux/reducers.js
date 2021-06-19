export const actions = {
  //hangman actions
  TOGGLE_HEAD: 'TOGGLE_HEAD',
  GUESS: 'GUESS',
  //user actions
  SET_WORD: 'SET_WORD',
};

const userInitialState = {
  email: '',
};

const hangmanInitialState = {
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
};

export const hangmanReducer = (state = hangmanInitialState, action) => {
  switch (action.type) {
    case actions.SET_WORD:
      return { ...state, word: action.payload };
    case actions.GUESS:
      return { ...state, ...action.payload };
    case actions.TOGGLE_HEAD:
      return { ...state, isHead: !state.isHead };
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
