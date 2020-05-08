import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LoginForm from '../components/LoginForm';
import CompanyLogo from '../svg-icons/CompanyLogo';
import { AuthContext } from '../context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(6),
    textAlign: 'center',
  },
}));

function LoginPage() {
  const classes = useStyles();

  const { authState } = React.useContext(AuthContext);

  return (
    <Route
      render={() =>
        authState.isAuthenticated ? (
          <Redirect to="/admin" />
        ) : (
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.container}
          >
            <Grid item>
              <Link to="/">
                <CompanyLogo marginBottom="5rem" width="35rem" />
              </Link>
              <h2>Log in</h2>
              <LoginForm />
            </Grid>
          </Grid>
        )
      }
    />
  );
}

export default LoginPage;
