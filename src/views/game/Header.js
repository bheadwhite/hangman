import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { actions } from '../../redux/reducers';
import axios from 'axios';
import { useIsMobileScreen } from '../../hooks/useIsMobileScreen';

const useStyles = makeStyles({
  header: ({ isMobile }) => ({
    width: '100%',
    display: 'grid',
    padding: '8px',
    height: '71px',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr 1fr 1fr',
  }),
});

export const Header = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ isMobile });

  const handleNewGame = () =>
    axios.get(`/api/newGame`).then(({ data }) => {
      dispatch({ type: actions.INIT_GAME, payload: { ...data } });
    });

  return (
    <div className={classes.header}>
      <div>{/* logo */}</div>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          fontSize: isMobile ? '24px' : '45px',
          fontFamily: 'lato',
        }}>
        HANGMAN
      </div>
      <Button
        style={{
          justifySelf: 'flex-end',
          background: 'lightgrey',
        }}
        onClick={handleNewGame}>
        New Game
      </Button>
    </div>
  );
};
