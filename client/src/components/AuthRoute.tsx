import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const AuthRoute: React.FC<Props> = ({ children, ...other }) => {
  const isAuthenticated = false;

  return (
    <Route
      {...other}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
