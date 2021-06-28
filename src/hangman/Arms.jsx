import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useIsMobileScreen } from '../hooks/useIsMobileScreen';

const useStyles = makeStyles({
  arms: ({ isMobile }) => ({
    height: isMobile ? '59px' : '125px',
    width: isMobile ? '66px' : '120px',
    position: 'absolute',
    display: 'grid',
    gridAutoFlow: 'column',
    placeItems: 'center stretch',
  }),
  arm: {
    height: '100%',
    borderBottom: '2px solid black',
    width: '100%',
  },
});

export const Arms = () => {
  const isMobile = useIsMobileScreen();
  const { isLeftArm, isRightArm } = useSelector((state) => state.hangman);
  const classes = useStyles({ isMobile });

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
