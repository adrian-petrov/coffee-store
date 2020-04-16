import React from 'react';
import { css } from '@emotion/core';

import LoginForm from '../components/LoginForm';
import CompanyLogo from '../components/CompanyLogo';

const LoginPage: React.FC = () => {
  return (
    <div
      css={css`
        height: 100vh;
        background-color: #333333;
        color: white;
        padding: 4rem;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;

          svg {
            fill: white;
            width: 35rem;
            margin-bottom: 3rem;
          }
        `}
      >
        <CompanyLogo />
      </div>
      <div className="container">
        <h1
          css={css`
            text-align: center;
          `}
        >
          Sign in
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
