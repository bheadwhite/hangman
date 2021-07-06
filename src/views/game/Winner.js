import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const Winner = () => {
  const isWinner = useSelector((state) => state.hangman.winner);
  const [winnerName, setWinnerName] = React.useState('');
  const history = useHistory();

  const handleScoreSubmit = () => {
    if (winnerName.trim() === '') {
      return;
    }
    axios.post('/api/newLeader', { name: winnerName }).then(() => {
      history.push('/leaderboard');
    });
  };
  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    const code = e.keyCode;

    if (key === 'ENTER' || code === 13) {
      handleScoreSubmit();
    }
  };

  if (!isWinner) {
    return null;
  }

  return (
    <div
      style={{
        background: '#fff',
        padding: '8px',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}>
      <h2>Congratulations, you've won!!!</h2>
      <div>
        Please enter your name to save your score.
        <input
          type='text'
          autoFocus
          value={winnerName}
          onChange={(e) => setWinnerName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleScoreSubmit}>Submit</Button>
      </div>
    </div>
  );
};
