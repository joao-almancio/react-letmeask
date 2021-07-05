import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

import { Home } from '../pages/Home';
import { NewRoom } from '../pages/NewRoom';
import { Room } from '../pages/Room';

export function AppRoute() {
  const { user } = useAuth()
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/rooms/new'>
        {user ? <NewRoom /> : <Redirect to="/" />}
      </Route>
      <Route path="/rooms/:id" component={Room} />

      <Route>
        <Redirect to='/' />
      </Route>
    </Switch>
  )
}