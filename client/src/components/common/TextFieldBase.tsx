import React from 'react';
import { useField, FieldAttributes } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';

function TextFieldBase(props: FieldAttributes<TextFieldProps>) {
  const [field, meta] = useField(props);

  return (
    <TextField
      {...field}
      {...props}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
}

export default TextFieldBase;
