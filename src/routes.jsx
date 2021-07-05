import { Switch, Route } from 'react-router-dom';
import { Game, Leaderboard } from './views';

export const routes = (
  <Switch>
    <Route path='/' exact component={Game} />
    <Route path='/leaderboard' component={Leaderboard} />
  </Switch>
);
