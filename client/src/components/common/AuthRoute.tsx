import React from 'react';
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

type Props = RouteProps & {
  component: any;
  authenticationPath: string;
};

function AuthRoute({
  component: Component,
  authenticationPath,
  ...other
}: Props) {
  const { authState } = React.useContext(AuthContext);

  return (
    <Route
      {...other}
      render={(routeProps: RouteComponentProps) =>
        authState.isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to={authenticationPath} />
        )
      }
    />
  );
}

export default AuthRoute;
