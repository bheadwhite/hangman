import { createStore, combineReducers } from 'redux';
import { hangmanReducer, wordReducer } from './reducers';

export const store = createStore(
  combineReducers({ hangman: hangmanReducer, word: wordReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
