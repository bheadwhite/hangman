import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Hangman } from '../hangman/Hangman';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { actions } from '../redux/reducers';
import axios from 'axios';

const useStyles = makeStyles({
  gameContainer: {
    display: 'grid',
    placeItems: 'center',
    height: '100%',
    background:
      'url(https://res.cloudinary.com/dshmwg7vw/image/upload/v1550486966/OCCNFD0.jpg)',
  },
});

// export const Game = connect(/* read/mapStateToProps */ /* write/mapDispatchToProps */ )(() => {
export const Game = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { word, guessedLetters, incorrectGuesses } = useSelector(
    (state) => state.hangman,
    shallowEqual,
  );
  const [guess, setGuess] = React.useState('');

  const makeGuess = () => {
    axios.post('/api/guess', { guess }).then(({ data }) => {
      dispatch({ type: actions.GUESS, payload: data });
    });
  };

  const handleGuess = (e) => setGuess(e.target.value);

  return (
    <div className={classes.gameContainer}>
      <div>
        guesses
        <div>
          {guessedLetters.map((letter) => (
            <span key={letter}>{letter}</span>
          ))}
        </div>
      </div>
      <Hangman />
      <TextField onChange={handleGuess} />
      <Button onClick={makeGuess}>submit</Button>
      <div style={{ letterSpacing: '7px', fontSize: '70px' }}>{word}</div>
    </div>
  );
};
