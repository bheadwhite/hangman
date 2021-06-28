import { makeStyles } from '@material-ui/core/styles';
import { useIsMobileScreen } from '../hooks/useIsMobileScreen';

const useStyles = makeStyles({
  container: ({ isMobile }) => ({
    width: isMobile ? '291px' : '328px',
    height: isMobile ? '200px' : '415px',
    position: 'relative',
    padding: '16px',
  }),
  top: ({ isMobile }) => ({
    borderTop: '4px solid black',
    borderRight: '4px solid black',
    borderLeft: '4px solid black',
    position: 'absolute',
    left: '90px',
    width: isMobile ? '79px' : '138px',
    height: isMobile ? '26px' : '46px',
  }),
  body: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto 1fr',
  },
  scaffold: (theme) => ({
    borderRight: '4px solid black',
    height: theme.isMobile ? '200px' : '380px',
    width: '78px',
  }),
  footing: ({ isMobile }) => ({
    borderTop: '4px solid black',
    width: isMobile ? '131px' : '215px',
  }),
});

export const Gallow = ({ children }) => {
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ isMobile });
  return (
    <div className={classes.container}>
      <div className={classes.top}></div>
      <div className={classes.body}>
        <div className={classes.scaffold} />
        {children}
      </div>
      <div className={classes.footing}></div>
    </div>
  );
};
