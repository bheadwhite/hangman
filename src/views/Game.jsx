import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIsMobileScreen } from '../hooks/useIsMobileScreen';
import { Hangman } from '../hangman/Hangman';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { actions } from '../redux/reducers';
import axios from 'axios';

const useStyles = makeStyles({
  gameContainer: (theme) => ({
    display: 'grid',
    placeItems: 'center',
    placeContent: 'center',
    height: '100%',
    background:
      'url(https://res.cloudinary.com/dshmwg7vw/image/upload/v1550486966/OCCNFD0.jpg)',
  }),
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    display: 'grid',
    padding: '8px',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  gameTopSection: (theme) => ({
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: theme.smSize ? '1fr' : '1fr 1fr 1fr',
    placeItems: 'center',
  }),
  guesses: (theme) => ({
    padding: '16px',
    width: '200px',
    background: 'rgba(0,0,0,0.05)',
    minHeight: theme.isMobile ? '156px' : '200px',
  }),
  guessedLetter: {
    fontSize: '35px',
    marginRight: '8px',
  },
  bottomSection: {
    width: '100%',
    textAlign: 'center',
    marginTop: '40px',
  },
});

export const Game = (props) => {
  const { word } = useSelector((state) => state.hangman, shallowEqual);
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ smSize: isMobile });

  return (
    <div className={classes.gameContainer}>
      <Header />
      {isMobile && (
        <div
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateColumns: '1fr 1fr',
            border: '1px solid rgba(0,0,0,0.5)',
          }}>
          <GuessesOverlay />
          <FeedbackOverlay />
        </div>
      )}
      <div className={classes.gameTopSection}>
        {!isMobile && <GuessesOverlay />}
        <Hangman />
        {!isMobile && <FeedbackOverlay />}
      </div>
      <div className={classes.bottomSection}>
        <div
          style={{
            letterSpacing: '12px',
            fontSize: isMobile ? '37px' : '70px',
            marginBottom: '16px',
            fontWeight: '300',
          }}>
          {word}
        </div>
        <GuessLetter />
      </div>
    </div>
  );
};

const GameOver = () => {
  const correctWord = useSelector((state) => state.hangman.correctWord);
  const isGameOver = useSelector((state) => state.hangman.gameOver);
  if (!isGameOver) {
    return null;
  }

  return (
    <div
      style={{
        textAlign: 'center',
        background: 'rgba(0,0,0,0.05)',
        padding: '8px',
      }}>
      <h1>GAME OVER</h1>
      <h2>your word was: </h2>
      <h1>{correctWord}</h1>
    </div>
  );
};

const Winner = () => {
  const isWinner = useSelector((state) => state.hangman.winner);

  if (!isWinner) {
    return null;
  }

  return (
    <div style={{ background: 'rgba(0,0,0,0.05)', padding: '8px' }}>
      <h2>Congratulations, you've won!!!</h2>
      {/* <div>Enter your name to register this game on the leaderboard.</div> */}
    </div>
  );
};

const GuessLetter = () => {
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
    if (key.toUpperCase() === 'ENTER') {
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
        inputProps={{ style: { padding: '8px' } }}
        variant='outlined'
      />
      <Button style={{ background: 'lightgrey' }} onClick={makeGuess}>
        submit
      </Button>
    </React.Fragment>
  );
};

const GuessesOverlay = () => {
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ isMobile });
  const { guessedLetters } = useSelector(
    (state) => state.hangman,
    shallowEqual,
  );

  return (
    <div className={classes.guesses}>
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

const FeedbackOverlay = () => {
  return (
    <div>
      <Winner />
      <GameOver />
    </div>
  );
};

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleNewGame = () =>
    axios.get(`/api/newGame`).then(({ data }) => {
      dispatch({ type: actions.INIT_GAME, payload: data });
    });

  return (
    <div className={classes.header}>
      <div>{/* logo */}</div>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          fontSize: '45px',
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
