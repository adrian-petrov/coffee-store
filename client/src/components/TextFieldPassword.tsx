import React from 'react';
import { useField, FieldAttributes } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function TextFieldPassword(props: FieldAttributes<TextFieldProps>) {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassowrd] = React.useState(false);

  function handleToggleShowPassword() {
    setShowPassowrd(!showPassword);
  }

  return (
    <TextField
      {...field}
      {...props}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleToggleShowPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      /**
       * name="password"
       * name attribute has to be passed down when this component is used
       * because Formik's useField hook relies on it (props.name)
       */
      type={showPassword ? 'text' : 'password'}
      id="password"
      label="Password"
      required
    />
  );
}

export default TextFieldPassword;
