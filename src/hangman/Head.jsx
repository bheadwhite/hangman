import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  head: ({ isHead }) => ({
    height: '90px',
    width: '90px',
    borderRadius: '100%',
    border: `2px solid ${isHead ? 'black' : 'rgba(0,0,0,0)'}`,
  }),
});

export const Head = (props) => {
  const { isHead, gameOver } = useSelector((state) => state.hangman);
  const classes = useStyles({ isHead });
  return (
    <div className={classes.head}>
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
