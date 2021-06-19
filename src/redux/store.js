import { createStore, combineReducers } from 'redux';
import { hangmanReducer, userReducer } from './reducers';

export const store = createStore(
  combineReducers({ hangman: hangmanReducer, user: userReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
