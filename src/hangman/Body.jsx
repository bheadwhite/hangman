import { makeStyles } from '@material-ui/core';
import { useIsMobileScreen } from '../hooks/useIsMobileScreen';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  body: ({ isMobile }) => ({
    height: isMobile ? '61px' : '118px',
    width: '50px',
    marginTop: isMobile ? '45px' : '90px',
    display: 'grid',
    placeItems: 'stretch center',
    position: 'absolute',
  }),
});

export const Body = () => {
  const isBody = useSelector((state) => state.hangman.isBody);
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ isMobile });
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
