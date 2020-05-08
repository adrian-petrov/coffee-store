import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import AdminLayout from './layout/AdminLayout';
import PublicLayout from './layout/PublicLayout';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={AdminLayout} />
      <Route path="/" component={PublicLayout} />
    </Switch>
  </BrowserRouter>
);

export default App;
