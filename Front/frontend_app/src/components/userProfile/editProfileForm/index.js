import PropTypes from 'prop-types';
import {
  Avatar,
  Box, Button, Grid, MenuItem,
  Modal,
} from '@mui/material';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React, { useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Container from '@mui/material/Container';
import CircleLoader from '../../header/circleLoader';

const dataURLtoBlob = require('blueimp-canvas-to-blob');

const EditProfileForm = function ({
  userData, mutateUser, mutateAvatar, removeAvatar, isLoadingUser, isLoadingAvatar, id,
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

  const [image, setImage] = useState();
  const [cropper, setCropper] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [filename, setFilename] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file.type.match('image.*') && file.size < 10000000) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFilename(file.name);
    } else {
      console.error('Image error');
    }
  };

  const cropImage = () => {
    if (typeof cropper !== 'undefined') {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  };

  const deleteImage = () => {
    setCroppedImage(null);
    setImage(null);
  };

  const rmUserAvatar = () => {
    setImage(null);
    removeAvatar();
    // in deployment
  };

  const onFormSubmit = (data, actions) => {
    actions.setSubmitting(true);
    mutateUser(data);
    if (croppedImage) {
      const formData = new FormData();
      formData.append('avatar', dataURLtoBlob(croppedImage), filename);
      mutateAvatar(formData);
    }
    actions.setSubmitting(false);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid>
        {isLoadingUser && isLoadingAvatar && <CircleLoader />}

        <Box margin={1}><h1>EDIT PROFILE</h1></Box>

        <Formik
          onSubmit={onFormSubmit}
          initialValues={userData}
          validationSchema={schema}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Box margin={1}>
                <Grid container>
                  <Grid item xs={4}>
                    <Avatar
                      src={!croppedImage ? `http://localhost:3003/users/${userData.User_ID}/avatar` : croppedImage}
                      sx={{ width: '15vh', height: '15vh' }}
                      aria-label="username"
                    >
                      U
                    </Avatar>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid
                      container
                      minHeight="100%"
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      columnSpacing={{ xs: 1 }}
                    >
                      <Grid item>
                        {!image
                        && (
                        <Button variant="contained" component="label">
                          Choose image
                          <input type="file" hidden onChange={handleChange} />
                        </Button>
                        )}
                      </Grid>
                      <Grid item>
                        <Button variant="contained" onClick={rmUserAvatar} disabled>
                          Delete image
                        </Button>
                      </Grid>
                      {image
                        && (
                        <Grid item>
                          <Button variant="contained" onClick={deleteImage}>
                            Clear image
                          </Button>
                        </Grid>
                        )}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              {image && (
              // <Grid
              //   margin={1}
              //   container
              //   alignItems="center"
              //   justifyContent="center"
              //   maxWidth="50vh"
              //   rowSpacing={3}
              // >
              //   <Grid item>
              <Modal
                open
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Container component="main">
                  <Grid container justifyContent="center" direction="row" rowSpacing={1}>
                    <Cropper
                      src={image}
                      style={{ maxWidth: '50%' }}
                      initialAspectRatio={1}
                      minCropBoxWidth={200}
                      minCropBoxHeight={200}
                      zoomable={false}
                      onInitialized={(instance) => setCropper(instance)}
                      viewMode={1}
                    />
                    <Button fullWidth variant="contained" onClick={cropImage}>
                      Crop
                    </Button>
                    <Button fullWidth variant="contained" onClick={deleteImage}>
                      Cancel
                    </Button>
                  </Grid>
                </Container>
              </Modal>
              )}
              {/* </Grid> */}
              {/* </Grid> */}

              <Box margin={1}>
                <Grid container marginTop={4} columnSpacing={{ xs: 2 }}>
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
                      disabled
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
  id: PropTypes.string.isRequired,
  mutateUser: PropTypes.func.isRequired,
  mutateAvatar: PropTypes.func.isRequired,
  removeAvatar: PropTypes.func.isRequired,
  isLoadingUser: PropTypes.bool.isRequired,
  isLoadingAvatar: PropTypes.bool.isRequired,
};
