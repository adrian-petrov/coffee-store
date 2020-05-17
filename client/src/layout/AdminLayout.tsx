import { css } from '@emotion/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import AuthRoute from '../components/common/AuthRoute';
import { AuthProvider } from '../context/AuthContext';
import AdminPage from '../pages/admin/AdminPage';
import AdminLoginPage from '../pages/admin/LoginPage';
import AdminRegisterPage from '../pages/admin/RegisterPage';

const darkTheme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#1c98eb',
    },
    secondary: {
      main: '#f0f0f0',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        marginTop: '1.5rem',
        padding: '1rem 22px !important',
      },
    },
    MuiCircularProgress: {
      root: {
        height: '25px !important',
        width: '25px !important',
      },
    },
  },
});

const AdminLayout = ({ match }: RouteComponentProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div
        css={css`
          height: 100vh;
          background-color: #333333;
          color: white;
        `}
      >
        <AuthProvider>
          <Switch>
            <Route path={`${match.path}/login`} component={AdminLoginPage} />
            <Route
              path={`${match.path}/register`}
              component={AdminRegisterPage}
            />
            <AuthRoute
              path={match.path}
              authenticationPath={`${match.path}/login`}
              component={AdminPage}
            />
          </Switch>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
