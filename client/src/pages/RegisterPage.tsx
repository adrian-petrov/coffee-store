import React from 'react';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';

import RegisterForm from '../components/RegisterForm';
import CompanyLogo from '../svg-icons/CompanyLogo';

const RegisterPage: React.FC = () => {
  return (
    <div className="container">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Link to="/">
          <CompanyLogo marginBottom="5rem" width="35rem" />
        </Link>
        <h2>Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
