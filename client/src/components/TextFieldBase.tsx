import React, { useState, useCallback } from 'react';
import { useField, FieldAttributes } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';
import { debounce } from '../utils';

const TextFieldBase = (props: FieldAttributes<TextFieldProps | null>) => {
  const [value, setValue] = useState<string | null>('');
  const [field, meta, helper] = useField(props);

  const debounceCallback = useCallback(
    debounce(event => {
      field.onChange(event);
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    setValue(e.target.value);
    // remove error when user starts typing
    helper.setError(null);
    // fire debounced onChange handler
    debounceCallback(e);
  };

  return (
    <>
      <TextField {...field} {...props} onChange={handleChange} value={value} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  );
};

export default TextFieldBase;
