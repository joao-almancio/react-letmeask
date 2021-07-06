import { Redirect, Route, Switch } from 'react-router-dom';
import { Home } from '../pages/Home';
import { NewRoom } from '../pages/NewRoom/NewRoom';
import { Room } from '../pages/Room';
import { AdminRoom } from '../pages/AdminRoom';

import { useAuth } from '../hooks/useAuth';

export function AppRoute() {
  const { user } = useAuth()
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/rooms/new'>
        {user ? <NewRoom /> : <Redirect to="/" />}
      </Route>
      <Route path="/rooms/:id" component={Room} />

      <Route path="/admin/rooms/:id" component={AdminRoom} />

      <Route>
        <Redirect to='/' />
      </Route>
    </Switch>
  )
}