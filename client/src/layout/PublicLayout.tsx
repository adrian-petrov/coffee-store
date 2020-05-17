import React from 'react';
import { Route } from 'react-router-dom';
import { css } from '@emotion/core';

import Main from '../components/store/Main';
import Header from '../components/store/Header';
import Footer from '../components/store/Footer';
import IndexPage from '../pages/store/IndexPage';
import CartPage from '../pages/store/CartPage';
import ProductsPage from '../pages/store/ProductsPage';
import AccountPage from '../pages/store/AccountPage';

function PublicLayout() {
  return (
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
}

export default PublicLayout;
