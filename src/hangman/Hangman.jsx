import { makeStyles } from '@material-ui/core/styles';
import { Gallow } from './Gallow';
import { Head } from './Head';
import { Body } from './Body';
import { Arms } from './Arms';
import { Legs } from './Legs';

const useStyles = makeStyles({
  hangman: {
    height: '190px',
    position: 'relative',
    width: '264px',
    display: 'grid',
    placeItems: 'flex-start center',
    marginTop: '45px',
  },
});

export const Hangman = () => {
  const classes = useStyles();

  return (
    <Gallow>
      <div className={classes.hangman}>
        <Head />
        <Body />
        <Arms />
        <Legs />
      </div>
    </Gallow>
  );
};
