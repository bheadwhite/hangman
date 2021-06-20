import { useEffect } from 'react';
import { routes } from './routes';
import { useDispatch } from 'react-redux';
import { actions } from './redux/reducers';
import { Button } from '@material-ui/core';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/initGame').then(({ data }) => {
      dispatch({ type: actions.INIT_GAME, payload: data });
    });
  }, [dispatch]);

  const handleNewGame = () =>
    axios.get('/api/newGame').then(({ data }) => {
      dispatch({ type: actions.INIT_GAME, payload: data });
    });

  return (
    <div style={{ height: '100%' }}>
      <div style={{ display: 'grid', gridAutoFlow: 'column' }}>
        <Button style={{ justifySelf: 'flex-end' }} onClick={handleNewGame}>
          New Game
        </Button>
      </div>
      {routes}
    </div>
  );
}

export default App;
