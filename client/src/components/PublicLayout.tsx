import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { css } from '@emotion/core';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import IndexPage from '../pages/IndexPage';
import CartPage from '../pages/CartPage';
import ProductsPage from '../pages/ProductsPage';
import AccountPage from '../pages/AccountPage';

const PublicLayout: React.FC = () => (
  <div
    css={css`
      min-height: 100vh;
      display: grid;
      grid-template-rows: 1fr auto; /* Main & Footer */
    `}
  >
    <Header />
    <Main>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/account" component={AccountPage} />
      </Switch>
    </Main>
    <Footer />
  </div>
);

export default PublicLayout;
