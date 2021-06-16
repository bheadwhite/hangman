import React from 'react';
import { Head, Body, Arms, Legs } from '../Hangman';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  hangman: {
    height: '300px',
    position: 'relative',
    width: '200px',
    display: 'grid',
    placeItems: 'flex-start center',
  },
});

export const Game = () => {
  const classes = useStyles();
  const [isBody, setIsBody] = React.useState(false);
  const [isHead, setIsHead] = React.useState(false);
  const [isArms, setIsArms] = React.useState(false);
  const [isLegs, setIsLegs] = React.useState(false);

  const toggleBody = () => setIsBody((a) => !a);
  const toggleHead = () => setIsHead((a) => !a);
  const toggleArms = () => setIsArms((a) => !a);
  const toggleLegs = () => setIsLegs((a) => !a);

  return (
    <div>
      <div className={classes.hangman}>
        {isHead && <Head />}
        {isBody && <Body />}
        {isArms && <Arms />}
        {isLegs && <Legs />}
      </div>

      <Button onClick={toggleHead}>toggle head</Button>
      <Button onClick={toggleBody}>toggle body</Button>
      <Button onClick={toggleArms}>toggle Arms</Button>
      <Button onClick={toggleLegs}>toggle Legs</Button>
    </div>
  );
};
