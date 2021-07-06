import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIsMobileScreen } from '../../hooks/useIsMobileScreen';
import { Hangman } from '../../hangman/Hangman';
import { useSelector, shallowEqual } from 'react-redux';
import { FeedbackOverlay } from './FeedbackOverlay';
import { Header } from './Header';
import { GuessesOverlay } from './GuessesOverlay';
import { GuessLetter } from './GuessLetter';

const useStyles = makeStyles({
  gameContainer: (theme) => ({
    display: 'grid',
    height: '100%',
    gridTemplateRows: '71px 20px 1fr',
    background:
      'url(https://res.cloudinary.com/dshmwg7vw/image/upload/v1550486966/OCCNFD0.jpg)',
  }),
  game: {
    display: 'grid',
    placeItems: 'center',
    placeContent: 'center',
  },
  gameTopSection: (theme) => ({
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: theme.smSize ? '1fr 1fr' : '1fr 1fr 1fr',
    placeItems: 'center',
    gridGap: theme.smSize ? '48px' : '10px',
  }),
  bottomSection: {
    width: '100%',
    textAlign: 'center',
    marginTop: '40px',
  },
});

export const Game = (props) => {
  const { convertedWord, points } = useSelector(
    (state) => state.hangman,
    shallowEqual,
  );
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ smSize: isMobile });

  return (
    <div className={classes.gameContainer}>
      <Header />
      <div>Points: {points}</div>
      <div className={classes.game}>
        {isMobile && <FeedbackOverlay />}
        <div className={classes.gameTopSection}>
          {!isMobile && <FeedbackOverlay />}
          <Hangman />
          <GuessesOverlay />
        </div>
        <div className={classes.bottomSection}>
          <div
            style={{
              letterSpacing: '12px',
              fontSize: isMobile ? '37px' : '70px',
              marginBottom: '16px',
              fontWeight: '300',
            }}>
            {convertedWord}
          </div>
          <GuessLetter />
        </div>
      </div>
    </div>
  );
};
