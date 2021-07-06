import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIsMobileScreen } from '../hooks/useIsMobileScreen';
import { Hangman } from '../hangman/Hangman';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { actions } from '../redux/reducers';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
    width: theme.isMobile ? '144px' : '200px',
    background: 'rgba(0,0,0,0.05)',
    minHeight: theme.isMobile ? '156px' : '200px',
  }),
  guessedLetter: ({ isMobile }) => ({
    fontSize: isMobile ? '20px' : '35px',
    marginRight: '8px',
  }),
  bottomSection: {
    width: '100%',
    textAlign: 'center',
    marginTop: '40px',
  },
});

export const Game = (props) => {
  const { convertedWord } = useSelector((state) => state.hangman, shallowEqual);
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ smSize: isMobile });

  return (
    <div className={classes.gameContainer}>
      <Header />
      {isMobile && (
        <div
          style={{
            display: 'grid',
          }}>
          <FeedbackOverlay />
          <GuessesOverlay />
        </div>
      )}
      <div className={classes.gameTopSection}>
        {!isMobile && <FeedbackOverlay />}
        <Hangman />
        {!isMobile && <GuessesOverlay />}
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

const GuessesOverlay = ({ styles }) => {
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
      dispatch({ type: actions.INIT_GAME, payload: { ...data } });
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
