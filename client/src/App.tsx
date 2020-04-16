import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AdminLayout from './components/AdminLayout';
import PublicLayout from './components/PublicLayout';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={AdminLayout} />
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={PublicLayout} />
    </Switch>
  </BrowserRouter>
);

export default App;
