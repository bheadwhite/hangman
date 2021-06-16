import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  body: {
    height: '118px',
    width: '50px',
    marginTop: '90px',
    display: 'grid',
    placeItems: 'stretch center',
    position: 'absolute',
  },
});

export const Body = () => {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <div style={{ borderLeft: '2px solid black', height: '100%' }} />
    </div>
  );
};
