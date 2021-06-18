import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Hangman } from '../hangman/Hangman';
import { connect } from 'react-redux';
import { toggleHead } from '../redux/reducers';

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
export const Game = connect(null, { toggleHead })((props) => {
  const classes = useStyles();

  const toggleIsHead = () => {
    props.toggleHead();
  };

  return (
    <div className={classes.gameContainer}>
      <Hangman />

      <Button onClick={toggleIsHead}>toggle head</Button>
      {/* <Button onClick={toggleBody}>toggle body</Button>
      <Button onClick={toggleArms}>toggle Arms</Button>
      <Button onClick={toggleLegs}>toggle Legs</Button> */}
    </div>
  );
});
