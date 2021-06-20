import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  legs: {
    height: '50px',
    width: '162px',
    display: 'grid',
    gridAutoFlow: 'column',
    position: 'absolute',
    marginTop: '208px',
  },
  leftLeg: ({ isLeftLeg }) => ({
    borderTop: `2px solid ${isLeftLeg ? 'black' : 'rgba(0,0,0,0)'}`,
    transform: 'rotate(-52deg) translate(4px, 41px)',
  }),
  rightLeg: ({ isRightLeg }) => ({
    borderTop: `2px solid ${isRightLeg ? 'black' : 'rgba(0,0,0,0)'}`,
    transform: 'rotate(53deg) translate(-3px, 41px)',
  }),
});

export const Legs = () => {
  const { isLeftLeg, isRightLeg } = useSelector((state) => state.hangman);
  const classes = useStyles();
  return (
    <div className={classes.legs}>
      <LeftLeg isLeftLeg={isLeftLeg} />
      <RightLeg isRightLeg={isRightLeg} />
    </div>
  );
};

const LeftLeg = (props) => {
  const classes = useStyles({ isLeftLeg: props.isLeftLeg });
  return <div className={classes.leftLeg} />;
};

const RightLeg = (props) => {
  const classes = useStyles({ isRightLeg: props.isRightLeg });
  return <div className={classes.rightLeg} />;
};
