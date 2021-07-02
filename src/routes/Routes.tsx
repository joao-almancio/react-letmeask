import { BrowserRouter } from 'react-router-dom';

import { AppRoute } from './AppRoute';

export function Routes() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  )
}