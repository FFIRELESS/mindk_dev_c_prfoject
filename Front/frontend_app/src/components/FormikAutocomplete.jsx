import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { fieldToTextField } from 'formik-mui';
import PropTypes from 'prop-types';

const FormikAutocomplete = function (props) {
  const { form: { setTouched, setFieldValue } } = props;
  const { error, helperText, ...field } = fieldToTextField(props);
  const { name, label, value } = field;

  return (
    <Autocomplete
      {...props}
      {...field}
      getOptionLabel={ (option) => option.label ? option.label : value }
      isOptionEqualToValue={ (option, value) => option.value === value.value }
      onChange={(_, { value }) => setFieldValue(name, value)}
      onBlur={() => setTouched({ [name]: true })}
      renderInput={props => (
          <TextField
              {...props}
              label={label}
              helperText={helperText}
              error={error}
          />
      )}
    />
  );
};

FormikAutocomplete.propTypes = {
  props: PropTypes.object,
};

export default FormikAutocomplete;
