import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  head: {
    height: '90px',
    width: '90px',
    borderRadius: '100%',
    border: '2px solid black',
  },
});

export const Head = () => {
  const classes = useStyles();
  return <div className={classes.head} />;
};
