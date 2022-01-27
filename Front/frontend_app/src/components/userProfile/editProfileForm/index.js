import PropTypes from 'prop-types';
import {
  Box, Button, Grid, MenuItem,
} from '@mui/material';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';

const EditProfileForm = function ({
  userData, mutate, isLoading, id,
}) {
  const schema = Yup.object().shape({
    University_ID: Yup.number().typeError('University_ID must be a number').required(),
    Username: Yup.string('Username must not be empty').required(),
    Fullname: Yup.string('Fullname must not be empty').required(),
    Email: Yup.string().email('Email is incorrect').required(),
    Phone: Yup.string().matches(
      /^\+[0-9]{3}\d{9}$/g,
      'Invalid phone number',
    ).required(),
    FName_Visibility: Yup.string().required(),
    Email_Visibility: Yup.string().required(),
    Phone_Visibility: Yup.string().required(),
  });

  const visibilityVars = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'friends',
      label: 'Friends',
    },
    {
      value: 'all',
      label: 'All',
    },
  ];

  const onFormSubmit = (data, actions) => {
    setTimeout(() => {
      actions.setSubmitting(true);
      mutate({ id, data });
      actions.setSubmitting(false);
    }, 1000);
  };

  return (
    // <div className="card">
    //   <p><b>THIS IS YOUR PROFILE</b></p>
    //   Choose avatar:
    //   <form action={`http://localhost:3003/users/${id}/avatar`} method="post" encType="multipart/form-data">
    //     <input type="file" name="avatar" />
    //     <button type="submit">SEND</button>
    //   </form>
    //   <Link to="/"><Button>GO TO MAIN PAGE</Button></Link>
    // </div>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid>
        {isLoading && <div>Loading...</div>}

        <Box margin={1}><h1>EDIT PROFILE</h1></Box>

        <Formik
          onSubmit={onFormSubmit}
          initialValues={userData}
          validationSchema={schema}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Box margin={1}>
                <Grid container columnSpacing={{ xs: 2 }}>
                  <Grid item xs={3}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="integer"
                      name="University_ID"
                      label="University_ID"
                      helperText=" "
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="text"
                      name="Username"
                      label="Username"
                      helperText=" "
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box margin={1}>
                <Grid container columnSpacing={{ xs: 2 }}>
                  <Grid item xs={9}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="text"
                      name="Fullname"
                      label="Fullname"
                      helperText=" "
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="text"
                      name="FName_Visibility"
                      label="FName_Visibility"
                      select
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {visibilityVars.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                </Grid>
              </Box>

              <Box margin={1}>
                <Grid container columnSpacing={{ xs: 2 }}>
                  <Grid item xs={9}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="email"
                      name="Email"
                      label="Email"
                      helperText=" "
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="text"
                      name="Email_Visibility"
                      label="Email_Visibility"
                      select
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {visibilityVars.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                </Grid>
              </Box>

              <Box margin={1}>
                <Grid container columnSpacing={{ xs: 2 }}>
                  <Grid item xs={9}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="text"
                      name="Phone"
                      label="Phone"
                      helperText=" "
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="text"
                      name="Phone_Visibility"
                      label="Phone_Visibility"
                      select
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {visibilityVars.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                </Grid>
              </Box>

              <Grid container columnSpacing={{ xs: 1 }}>
                <Grid item xs={8}>
                  <Button
                    sx={{ margin: 1 }}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || !isValid}
                    type="submit"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={3.6}>
                  <Button
                    href={`/users/${id}`}
                    sx={{ margin: 1 }}
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default EditProfileForm;

EditProfileForm.propTypes = {
  userData: PropTypes.shape({
    User_ID: PropTypes.number.isRequired,
    University_ID: PropTypes.number.isRequired,
    Username: PropTypes.string.isRequired,
    Fullname: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Phone: PropTypes.string,
  }).isRequired,
  id: PropTypes.number.isRequired,
  mutate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
