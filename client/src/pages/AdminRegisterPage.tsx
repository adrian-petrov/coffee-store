import React from 'react';
import { Link } from 'react-router-dom';

import AdminRegisterForm from '../components/AdminRegisterForm';
import CompanyLogo from '../svg-icons/CompanyLogo';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(6),
    textAlign: 'center',
  },
}));

function AdminRegisterPage() {
  const classes = useStyles();

  return (
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
        <h2>Register</h2>
        <AdminRegisterForm />
      </Grid>
    </Grid>
  );
}

export default AdminRegisterPage;
