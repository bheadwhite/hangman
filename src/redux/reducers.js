export const actions = {
  //hangman actions
  TOGGLE_HEAD: 'TOGGLE_HEAD',
  //word actions
  SET_WORD: 'SET_WORD',
};

// actionCreators

export const toggleHead = () => {
  return {
    type: actions.TOGGLE_HEAD,
  };
};

const wordInitialState = {
  word: '',
};

const hangmanInitialState = {
  isHead: false,
  isLeftArm: false,
  isRightArm: false,
  isBody: false,
  isLeftLeg: false,
  isRightLeg: false,
};

export const hangmanReducer = (state = hangmanInitialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_HEAD:
      return { ...state, isHead: !state.isHead };
    default:
      return state;
  }
};

export const wordReducer = (state = wordInitialState, action) => {
  switch (action.type) {
    case actions.SET_WORD:
      return { word: action.payload };
    default:
      return state;
  }
};
