import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIsMobileScreen } from '../../hooks/useIsMobileScreen';
import { useSelector, shallowEqual } from 'react-redux';

const useStyles = makeStyles({
  guesses: (theme) => ({
    padding: '16px',
    width: theme.isMobile ? '144px' : '200px',
    background: 'rgba(0,0,0,0.05)',
    minHeight: theme.isMobile ? '156px' : '200px',
  }),
  guessedLetter: ({ isMobile }) => ({
    fontSize: isMobile ? '20px' : '35px',
    marginRight: '8px',
  }),
});

export const GuessesOverlay = ({ styles }) => {
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ isMobile });
  const { guessedLetters } = useSelector(
    (state) => state.hangman,
    shallowEqual,
  );

  return (
    <div className={classes.guesses} style={styles}>
      <h2
        style={{
          textAlign: 'center',
          margin: 0,
          borderBottom: '1px solid black',
        }}>
        Guessed Letters
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {guessedLetters.map((letter) => (
          <span className={classes.guessedLetter} key={letter}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};
