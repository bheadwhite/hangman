import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

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
  rightLeg: () => ({
    borderTop: '2px solid black',
    transform: 'rotate(53deg) translate(-3px, 41px)',
  }),
});

const mapStateToProps = (state) => {
  return {
    isLeftLeg: state.hangman.isLeftLeg,
    isRightLeg: state.hangman.isRightLeg,
  };
};

export const Legs = connect(mapStateToProps)((props) => {
  const classes = useStyles();
  return (
    <div className={classes.legs}>
      <LeftLeg {...props} />
      <RightLeg {...props} />
    </div>
  );
});

const LeftLeg = (props) => {
  const classes = useStyles({ isLeftLeg: props.isLeftLeg });
  return <div className={classes.leftLeg} />;
};

const RightLeg = () => {
  const classes = useStyles();
  return <div className={classes.rightLeg} />;
};
