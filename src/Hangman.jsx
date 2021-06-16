import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  head: {
    height: '50px',
    width: '50px',
    borderRadius: '100%',
    border: '1px solid black',
  },
  body: {
    height: '65px',
    width: '50px',
    marginTop: '50px',
    display: 'grid',
    placeItems: 'stretch center',
    position: 'absolute',
  },
  arms: {
    height: '75px',
    width: '75px',
    position: 'absolute',
    display: 'grid',
    gridAutoFlow: 'column',
    placeItems: 'center stretch',
  },
  arm: {
    height: '100%',
    borderBottom: '1px solid black',
    width: '100%',
  },
  legs: {
    height: '50px',
    width: '105px',
    display: 'grid',
    gridAutoFlow: 'column',
    position: 'absolute',
    marginTop: '115px',
  },
  leftLeg: {
    borderTop: '1px solid black',
    transform: 'rotate(-52deg) translate(10px, 30px)',
  },
  rightLeg: {
    borderTop: '1px solid black',
    transform: 'rotate(53deg) translate(-10px, 30px)',
  },
});

export const Head = () => {
  const classes = useStyles();
  return <div className={classes.head} />;
};

export const Body = () => {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <div style={{ borderLeft: '1px solid black', height: '100%' }} />
    </div>
  );
};

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

export const Legs = () => {
  const classes = useStyles();
  return (
    <div className={classes.legs}>
      <LeftLeg />
      <RightLeg />
    </div>
  );
};

const LeftLeg = () => {
  const classes = useStyles();
  return <div className={classes.leftLeg} />;
};

const RightLeg = () => {
  const classes = useStyles();
  return <div className={classes.rightLeg} />;
};
