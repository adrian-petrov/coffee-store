import React from 'react';
import { Route } from 'react-router-dom';
import { css } from '@emotion/core';

import Main from '../components/Main';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IndexPage from '../pages/IndexPage';
import CartPage from '../pages/CartPage';
import ProductsPage from '../pages/ProductsPage';
import AccountPage from '../pages/AccountPage';

const PublicLayout = () => (
  <div
    css={css`
      min-height: 100vh;
      display: grid;
      grid-template-rows: 1fr auto; /* Main & Footer */
    `}
  >
    <Header />
    <Main>
      <Route exact path="/" component={IndexPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/account" component={AccountPage} />
    </Main>
    <Footer />
  </div>
);

export default PublicLayout;
