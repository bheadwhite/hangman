import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Hangman } from '../hangman/Hangman';

const useStyles = makeStyles({});

export const Game = () => {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100%',
        background:
          'url(https://res.cloudinary.com/dshmwg7vw/image/upload/v1550486966/OCCNFD0.jpg)',
      }}>
      <Hangman />

      {/* <Button onClick={toggleHead}>toggle head</Button>
      <Button onClick={toggleBody}>toggle body</Button>
      <Button onClick={toggleArms}>toggle Arms</Button>
      <Button onClick={toggleLegs}>toggle Legs</Button> */}
    </div>
  );
};