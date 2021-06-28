import { makeStyles } from '@material-ui/core';
import { useIsMobileScreen } from '../hooks/useIsMobileScreen';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  legs: ({ isMobile }) => ({
    height: '50px',
    width: isMobile ? '96px' : '162px',
    display: 'grid',
    gridAutoFlow: 'column',
    position: 'absolute',
    marginTop: isMobile ? '95px' : '208px',
  }),
  leftLeg: ({ isLeftLeg, isMobile }) => {
    const mobileTransform = `rotate(-61deg) translate(1px, 37px)`;
    const nonMobileTransform = `rotate(-52deg) translate(4px, 41px)`;
    return {
      borderTop: `2px solid ${isLeftLeg ? 'black' : 'rgba(0,0,0,0)'}`,
      transform: isMobile ? mobileTransform : nonMobileTransform,
    };
  },
  rightLeg: ({ isRightLeg, isMobile }) => {
    const mobileTransform = `rotate(64deg) translate(-2px, 39px)`;
    const nonMobileTransform = `rotate(53deg) translate(-3px, 41px)`;
    return {
      borderTop: `2px solid ${isRightLeg ? 'black' : 'rgba(0,0,0,0)'}`,
      transform: isMobile ? mobileTransform : nonMobileTransform,
    };
  },
});

export const Legs = () => {
  const { isLeftLeg, isRightLeg } = useSelector((state) => state.hangman);
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ isMobile });
  return (
    <div className={classes.legs}>
      <LeftLeg isLeftLeg={isLeftLeg} />
      <RightLeg isRightLeg={isRightLeg} />
    </div>
  );
};

const LeftLeg = (props) => {
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ isLeftLeg: props.isLeftLeg, isMobile });
  return <div className={classes.leftLeg} />;
};

const RightLeg = (props) => {
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ isRightLeg: props.isRightLeg, isMobile });
  return <div className={classes.rightLeg} />;
};
