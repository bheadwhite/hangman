import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { actions } from '../redux/reducers';

export const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const { winner } = useSelector((state) => state.hangman, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();

  const getLeaders = () => {
    return new Promise((res, rej) =>
      axios.get('/api/getLeaderboard').then(({ data }) => res(data)),
    );
  };

  const handleNewGame = () => {
    axios.get(`/api/newGame`).then(({ data }) => {
      dispatch({ type: actions.INIT_GAME, payload: { ...data } });
      history.push('/');
    });
  };
  const handleBack = () => {
    history.push('/');
  };

  useEffect(() => {
    getLeaders().then((leaders) => setLeaders(leaders));
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: 'blue' }}>
        Hangman Leaderboard
        {winner ? (
          <Button onClick={handleNewGame}>New Game</Button>
        ) : (
          <Button onClick={handleBack}>Back</Button>
        )}
      </h2>
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          placeItems: 'center',
          gridTemplateColumns: '1fr 2fr 1fr',
          fontSize: '18px',
          fontWeight: 'bold',
          borderBottom: '1px solid black',
        }}>
        <div>Name</div>
        <div>Word</div>
        <div>Points</div>
      </div>
      {leaders.map((l) => (
        <div
          key={l.word + l.name}
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateColumns: '1fr 2fr 1fr',
            placeItems: 'center',
            gridGap: '12px',
          }}>
          <div>{l.name}</div>
          <div>{l.word}</div>
          <div>{l.points}</div>
        </div>
      ))}
    </div>
  );
};
