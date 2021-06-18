import { makeStyles } from '@material-ui/core';

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
  const classes = useStyles();

  return (
    <div className={classes.arms}>
      <LeftArm />
      <RightArm />
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
