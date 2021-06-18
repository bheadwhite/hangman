import { useEffect } from 'react';
import { routes } from './routes';
import { useDispatch } from 'react-redux';
import { actions } from './redux/reducers';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/getWord').then(({ data }) => {
      const [word] = data;

      dispatch({ type: actions.SET_WORD, payload: word });
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
