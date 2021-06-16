import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  legs: {
    height: '50px',
    width: '162px',
    display: 'grid',
    gridAutoFlow: 'column',
    position: 'absolute',
    marginTop: '208px',
  },
  leftLeg: {
    borderTop: '2px solid black',
    transform: 'rotate(-52deg) translate(4px, 41px)',
  },
  rightLeg: {
    borderTop: '2px solid black',
    transform: 'rotate(53deg) translate(-3px, 41px)',
  },
});

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
