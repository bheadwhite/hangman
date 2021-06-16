import { Switch, Route } from 'react-router-dom';
import { /* Home, */ Game, Leaderboard } from './views';

export const routes = (
  <Switch>
    <Route path='/' component={Game} />
    {/* <Route path='/game' component={Game} /> */}
    <Route path='/leaderboard' component={Leaderboard} />
  </Switch>
);
