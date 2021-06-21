import { makeStyles } from '@material-ui/core';
import { useSelector, shallowEqual } from 'react-redux';
import { SentimentSatisfiedOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
  head: ({ isHead }) => ({
    height: '90px',
    width: '90px',
    borderRadius: '100%',
    border: `2px solid ${isHead ? 'black' : 'rgba(0,0,0,0)'}`,
  }),
});

export const Head = (props) => {
  const { isHead, gameOver, winner } = useSelector(
    (state) => state.hangman,
    shallowEqual,
  );
  const classes = useStyles({ isHead });
  return (
    <div className={classes.head}>
      {winner && (
        <SentimentSatisfiedOutlined
          style={{
            position: 'relative',
            height: '111px',
            width: '111px',
            left: '-12px',
            top: '-12px',
          }}
        />
      )}

      {gameOver && (
        <>
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridAutoFlow: 'column',
              height: '60px',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <div>X</div>
            <div>X</div>
          </div>
          <div style={{ borderTop: '1px solid black' }} />
        </>
      )}
    </div>
  );
};
