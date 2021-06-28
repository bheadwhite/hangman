import { makeStyles } from '@material-ui/core/styles';
import { useIsMobileScreen } from '../hooks/useIsMobileScreen';
import { Gallow } from './Gallow';
import { Head } from './Head';
import { Body } from './Body';
import { Arms } from './Arms';
import { Legs } from './Legs';

const useStyles = makeStyles({
  hangman: ({ isMobile }) => ({
    height: isMobile ? '153px' : '190px',
    position: 'relative',
    width: isMobile ? '146px' : '264px',
    display: 'grid',
    placeItems: 'flex-start center',
    marginTop: isMobile ? '24px' : '45px',
  }),
});

export const Hangman = () => {
  const isMobile = useIsMobileScreen();
  const classes = useStyles({ isMobile });

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
