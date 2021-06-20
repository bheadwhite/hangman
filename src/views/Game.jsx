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
    placeContent: 'center',
    height: '100%',
    background:
      'url(https://res.cloudinary.com/dshmwg7vw/image/upload/v1550486966/OCCNFD0.jpg)',
  },
  gameTopSection: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr 1fr 1fr',
    placeItems: 'center',
  },
  guesses: {
    border: '1px solid black',
    padding: '16px',
    height: '100%',
    width: '200px',
  },
  guessedLetter: {
    fontSize: '35px',
    marginRight: '8px',
  },
});

export const Game = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { word, guessedLetters, gameOver } = useSelector(
    (state) => state.hangman,
    shallowEqual,
  );
  const [guess, setGuess] = React.useState('');

  const makeGuess = () => {
    axios.post('/api/guess', { guess }).then(({ data }) => {
      setGuess('');
      dispatch({ type: actions.GUESS, payload: data });
    });
  };

  const handleGuess = (e) => setGuess(e.target.value);
  const handleKeyDown = (e) => {
    const key = e.key;
    if (key.toUpperCase() === 'ENTER') {
      makeGuess();
    }
  };

  return (
    <div className={classes.gameContainer}>
      <div className={classes.gameTopSection}>
        <div className={classes.guesses}>
          <h1 style={{ textAlign: 'center' }}>Letters</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {guessedLetters.map((letter) => (
              <span className={classes.guessedLetter} key={letter}>
                {letter}
              </span>
            ))}
          </div>
        </div>
        <Hangman />
        <div>{/*  //feedback */}</div>
      </div>
      <div>
        <div style={{ letterSpacing: '7px', fontSize: '70px' }}>{word}</div>
        <div>
          {gameOver ? (
            <div>GAME OVER</div>
          ) : (
            <>
              <TextField
                value={guess}
                onChange={handleGuess}
                onKeyDown={handleKeyDown}
              />
              <Button onClick={makeGuess}>submit</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
