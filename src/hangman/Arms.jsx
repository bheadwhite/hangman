import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  arms: {
    height: '125px',
    width: '120px',
    position: 'absolute',
    display: 'grid',
    gridAutoFlow: 'column',
    placeItems: 'center stretch',
  },
  arm: {
    height: '100%',
    borderBottom: '2px solid black',
    width: '100%',
  },
});

export const Arms = () => {
  const { isLeftArm, isRightArm } = useSelector((state) => state.hangman);
  const classes = useStyles();

  return (
    <div className={classes.arms}>
      {isLeftArm ? <LeftArm /> : <div />}
      {isRightArm ? <RightArm /> : <div />}
    </div>
  );
};

const RightArm = () => {
  const classes = useStyles();
  return <div className={classes.arm} />;
};

const LeftArm = () => {
  const classes = useStyles();
  return <div className={classes.arm} />;
};
