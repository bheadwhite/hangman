import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  head: ({ isHead }) => ({
    height: '90px',
    width: '90px',
    borderRadius: '100%',
    border: `2px solid ${isHead ? 'black' : 'rgba(0,0,0,0)'}`,
  }),
});

export const Head = (props) => {
  const isHead = useSelector((state) => state.hangman.isHead);
  const classes = useStyles({ isHead });
  return <div className={classes.head} />;
};
