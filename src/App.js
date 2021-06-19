import { useEffect } from 'react';
import { routes } from './routes';
import { useDispatch } from 'react-redux';
import { actions } from './redux/reducers';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/initGame').then(({ data }) => {
      dispatch({ type: actions.SET_WORD, payload: data });
    });
  }, [dispatch]);

  return (
    <div style={{ height: '100%' }}>
      <div>Hangman</div>
      {routes}
    </div>
  );
}

export default App;
