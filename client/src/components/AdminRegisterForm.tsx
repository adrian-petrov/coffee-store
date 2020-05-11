import { css } from '@emotion/core';
import { Button, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Formik, FormikHelpers } from 'formik';
import qs from 'qs';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import TextFieldBase from './TextFieldBase';
import TextFieldPassword from './TextFieldPassword';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function AdminRegisterForm() {
  async function handleFormSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) {
    try {
      const response = await axios({
        method: 'post',
        url: '/admin/register',
        data: qs.stringify(values),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status === 200) {
        actions.setStatus('success');
      }
    } catch (err) {
      const { errors } = err.response.data;

      for (let key in errors) {
        actions.setFieldError(key, errors[key]);
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
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(2, 'First name needs to be at least 2 characters')
            .required('Please enter your first name'),
          lastName: Yup.string()
            .min(2, 'Last name needs to be at least 2 characters')
            .required('Please enter your last name'),
          email: Yup.string()
            .email('Please provide a valid email address')
            .required('This field is required'),
          password: Yup.string().required('Please enter a password'),
        })}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isSubmitting, status }) => (
          <form
            onSubmit={handleSubmit}
            css={css`
              width: 40rem;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: space-between;

                & > div:nth-of-type(1) {
                  margin-right: 15px;
                }
              `}
            >
              <TextFieldBase
                name="firstName"
                id="firstName"
                label="First Name"
                variant="outlined"
                margin="normal"
                required
              />
              <TextFieldBase
                name="lastName"
                id="lastName"
                label="Last Name"
                variant="outlined"
                margin="normal"
                required
              />
            </div>
            <TextFieldBase
              name="email"
              id="email"
              label="Email Address"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <TextFieldPassword
              name="password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            {status === 'success' ? (
              <div
                css={css`
                  margin-top: 1rem;
                  padding: 1rem;
                  font-size: 2.2rem;
                  border-radius: 6px;
                  background-color: #545454;
                  text-align: center;
                `}
              >
                <p>Account successfully created!</p>
                <Button
                  component={Link}
                  to="/admin/login"
                  variant="text"
                  color="primary"
                >
                  Click here to log in
                </Button>
              </div>
            ) : (
              <>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    'Sign up'
                  )}
                </Button>
                <Button
                  component={Link}
                  to="/admin/login"
                  color="primary"
                  variant="text"
                  size="small"
                  fullWidth
                >
                  Already have an account? Log in here
                </Button>
              </>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AdminRegisterForm;
