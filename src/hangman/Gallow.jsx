import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    width: '328px',
    height: '415px',
    position: 'relative',
    padding: '16px',
  },
  top: {
    borderTop: '4px solid black',
    borderRight: '4px solid black',
    borderLeft: '4px solid black',
    position: 'absolute',
    left: '90px',
    width: '138px',
    height: '46px',
  },
  body: {
    display: 'grid',
    gridAutoFlow: 'column',
  },
  scaffold: {
    borderRight: '4px solid black',
    height: '380px',
    width: '78px',
  },
  footing: {
    borderTop: '4px solid black',
    width: '215px',
  },
});

export const Gallow = ({ children }) => {
  const classes = useStyles();
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
