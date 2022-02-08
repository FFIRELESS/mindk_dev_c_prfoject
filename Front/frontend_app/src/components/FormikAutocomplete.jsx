import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { fieldToTextField } from 'formik-mui';
import PropTypes from 'prop-types';

const FormikAutocomplete = function (props) {
  const { form: { setTouched, setFieldValue } } = props;
  const { error, helperText, ...field } = fieldToTextField(props);
  const { name, label } = field;

  return (
    <Autocomplete
      {...props}
      {...field}

        // ISSUE!!!
      getOptionLabel={(option) => option.value}
      //********* option.value=undefined ********

      onChange={(_, { value }) => setFieldValue(name, value)}
      onBlur={() => setTouched({ [name]: true })}
      // getOptionSelected={(item, current) => item.value === current.value}
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
  props: PropTypes.shape({

  }),
};

export default FormikAutocomplete;
