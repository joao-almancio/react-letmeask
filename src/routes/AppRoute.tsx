import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

import { Home } from '../pages/Home';
import { NewRoom } from '../pages/NewRoom';

export function AppRoute() {
  const { user } = useAuth()
  return (
    <>
      <Route path='/' exact component={Home} />
      <Route path='/rooms/new'>
        { user ? <NewRoom /> : <Redirect to="/" /> }
      </Route>
    </>
  )
}