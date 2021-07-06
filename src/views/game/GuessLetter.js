import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { actions } from '../../redux/reducers';
import axios from 'axios';

export const GuessLetter = () => {
  const dispatch = useDispatch();
  const [guess, setGuess] = React.useState('');
  const { gameOver, winner } = useSelector(
    (state) => state.hangman,
    shallowEqual,
  );

  const makeGuess = () => {
    axios.post(`/api/guess`, { guess }).then(({ data }) => {
      setGuess('');
      dispatch({ type: actions.GUESS, payload: data });
    });
  };

  const handleGuess = (e) => setGuess(e.target.value);
  const handleKeyDown = (e) => {
    const key = e.key;
    const code = e.keyCode;
    if (key.toUpperCase() === 'ENTER' || code === 13) {
      makeGuess();
    }
  };

  if (gameOver || winner) {
    return null;
  }

  return (
    <React.Fragment>
      <TextField
        value={guess}
        onChange={handleGuess}
        onKeyDown={handleKeyDown}
        style={{ background: '#fff' }}
        inputProps={{ style: { padding: '8px' }, autoCapitalize: 'none' }}
        variant='outlined'
      />
      <Button style={{ background: 'lightgrey' }} onClick={makeGuess}>
        submit
      </Button>
    </React.Fragment>
  );
};
