import { css } from '@emotion/core';
import {
  Button,
  createMuiTheme,
  ThemeProvider,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import TextFieldBase from './TextFieldBase';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1c98eb',
    },
    secondary: {
      main: '#f0f0f0',
    },
  },
});

const useStyles = makeStyles({
  root: {
    fontSize: '1.6rem',
  },
  button: {
    marginTop: '2rem',
  },
});

const LoginForm = () => {
  const classes = useStyles();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <ThemeProvider theme={darkTheme}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Please provide a valid email address')
              .required('This field is required'),
            password: Yup.mixed().required('This field is required'),
          })}
          validateOnBlur={false}
          validateOnChange={true}
          onSubmit={(values, actions) => console.log(values, actions)}
        >
          {({ handleSubmit, isValid, dirty, isSubmitting }) => (
            <form
              onSubmit={handleSubmit}
              css={css`
                width: 35rem;
              `}
            >
              <TextFieldBase
                name="email"
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                InputProps={{ className: classes.root }}
                InputLabelProps={{ className: classes.root }}
              />
              <TextFieldBase
                name="password"
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                required
                InputProps={{ className: classes.root }}
                InputLabelProps={{ className: classes.root }}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                disabled={!(isValid && dirty)}
                classes={{ root: clsx(classes.root, classes.button) }}
              >
                {isSubmitting ? (
                  <CircularProgress color="secondary" />
                ) : (
                  'Sign in'
                )}
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                size="large"
                fullWidth
                classes={{ root: clsx(classes.root, classes.button) }}
              >
                Sign up
              </Button>
            </form>
          )}
        </Formik>
      </ThemeProvider>
    </div>
  );
};

export default LoginForm;
