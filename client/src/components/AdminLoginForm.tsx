import { css } from '@emotion/core';
import axios from 'axios';
import qs from 'qs';
import { Formik, FormikHelpers } from 'formik';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import React from 'react';
import * as Yup from 'yup';
import TextFieldBase from './TextFieldBase';
import { AuthContext } from '../context/AuthContext';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextFieldPassword from './TextFieldPassword';

interface FormValues {
  email: string;
  password: string;
}

function LoginForm({ history }: RouteComponentProps) {
  const { updateAuthState } = React.useContext(AuthContext);

  async function handleFormSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) {
    try {
      const response = await axios({
        method: 'post',
        url: '/admin/login',
        data: qs.stringify(values),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.data.isAuthenticated) {
        updateAuthState({
          isAuthenticated: true,
          authUser: response.data.authUser,
        });

        window.localStorage.setItem('isAuthenticated', 'true');
        window.localStorage.setItem('authUser', `${response.data.authUser}`);

        history.push('/admin');
      }
    } catch (err) {
      const { errors } = err.response.data;
      if (errors.status === 401) {
        actions.setFieldError('email', 'Invalid email or password');
        actions.setFieldError('password', 'Invalid email or password');
      }
    }
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Please provide a valid email address')
            .required('This field is required'),
          password: Yup.string().required('This field is required'),
        })}
        validateOnBlur={false}
        validateOnChange={true}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form
            onSubmit={handleSubmit}
            css={css`
              width: 40rem;
            `}
          >
            <TextFieldBase
              name="email"
              id="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextFieldPassword
              name="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress color="secondary" /> : 'Log in'}
            </Button>
            <Button
              component={Link}
              to="/admin/register"
              color="primary"
              variant="text"
              size="small"
              fullWidth
            >
              Don't have an account? Register here
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default withRouter(LoginForm);
