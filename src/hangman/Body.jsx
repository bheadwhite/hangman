import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  body: {
    height: '118px',
    width: '50px',
    marginTop: '90px',
    display: 'grid',
    placeItems: 'stretch center',
    position: 'absolute',
  },
});

export const Body = () => {
  const isBody = useSelector((state) => state.hangman.isBody);
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <div
        style={{
          borderLeft: `2px solid ${isBody ? 'black' : 'rgba(0,0,0,0)'}`,
          height: '100%',
        }}
      />
    </div>
  );
};
