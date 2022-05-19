import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Cropper from 'react-cropper';

import {
  Avatar, Badge,
  Box, Button, Grid, IconButton, MenuItem,
  Modal, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';

import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import CircleLoader from '../../header/circleLoader';
import { modalBoxStyle } from '../../../styles/modalStyle';
import { userFormSchema } from './yup.validation.schema';
import { visibilityVars } from './visibilityOptions';
import { profileFormPropTypes } from '../../../propTypes/profileFormPT';

import 'cropperjs/dist/cropper.css';
import { checkAvatarUrlData } from '../../../services/avatarLinkChecker';

const dataURLtoBlob = require('blueimp-canvas-to-blob');

const EditProfileForm = function ({
  user,
  mutateUser, mutateAvatar, removeAvatar,
  isLoadingUser, isLoadingAvatar, refetchUserData,
  setOpen,
}) {
  const [image, setImage] = useState();
  const [cropper, setCropper] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [filename, setFilename] = useState();
  // const navigate = useNavigate();

  // TODO: needed changing university at autocomplete

  const userData = { ...user };
  const userAvatar = checkAvatarUrlData(userData);
  // const universityData = user.university;

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

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 35,
    height: 35,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

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

  // TODO: needed implementing a method below
  const rmUserAvatar = () => {
    setImage(null);
    removeAvatar();
  };

  const onFormSubmit = (data, actions) => {
    // TODO: bad user updating method

    actions.setSubmitting(true);
    const formData = new FormData();
    if (croppedImage) {
      formData.append('avatar', dataURLtoBlob(croppedImage), filename);
    }
    if (!isLoadingUser || !isLoadingAvatar) {
      actions.setSubmitting(false);
      actions.submitForm(mutateUser(data), mutateAvatar(formData))
        .then(() => {
          refetchUserData();
          setOpen(false);
        });
    }
  };

  return (
    <Box>
      {isLoadingUser && isLoadingAvatar && <CircleLoader />}

      <Box margin={1}><h1>EDIT PROFILE</h1></Box>

      <Formik
        onSubmit={onFormSubmit}
        initialValues={userData}
        validationSchema={userFormSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Box margin={1}>
              <Grid container alignItems="center" direction="row">
                <Grid item xs={4.7}>
                  <Box>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={(
                        <IconButton component="label">
                          <input type="file" hidden onChange={handleChange} />
                          <SmallAvatar><EditIcon /></SmallAvatar>
                        </IconButton>
                    )}
                    >
                      <Avatar
                        src={!croppedImage ? userAvatar : croppedImage}
                        sx={{ width: 100, height: 100 }}
                        aria-label="username"
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          left: '60%',
                          top: '-12%',
                        }}
                      >
                        <IconButton onClick={rmUserAvatar} disabled>
                          <SmallAvatar><CloseIcon /></SmallAvatar>
                        </IconButton>
                      </Box>
                    </Badge>
                  </Box>
                </Grid>
                <Grid item xs={7.3}>
                  <Field
                    component={TextField}
                    fullWidth
                    type="text"
                    name="Username"
                    label="Username"
                  />
                </Grid>
              </Grid>
            </Box>

            {image && (
              <Modal
                open
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalBoxStyle}>
                  <Typography gutterBottom id="modal-modal-title" variant="h5" component="h2">
                    Crop image
                  </Typography>
                  <Cropper
                    src={image}
                    style={{ maxWidth: '75%' }}
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
                </Box>
              </Modal>
            )}

            <Box margin={1}>
              <Grid container marginTop={4} columnSpacing={{ xs: 2 }}>
                <Grid item xs={12}>
                  {/* <Field */}
                  {/*  component={TextField} */}
                  {/*  fullWidth */}
                  {/*  type="integer" */}
                  {/*  name="University_ID" */}
                  {/*  label="University_ID" */}
                  {/*  helperText=" " */}
                  {/* /> */}
                </Grid>
              </Grid>
            </Box>

            <Box margin={1}>
              <Grid container columnSpacing={{ xs: 2 }}>
                <Grid item xs={8}>
                  <Field
                    component={TextField}
                    fullWidth
                    type="text"
                    name="Fullname"
                    label="Fullname"
                    helperText=" "
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    fullWidth
                    type="text"
                    name="FName_Visibility"
                    label="Visibility"
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
                <Grid item xs={8}>
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
                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    fullWidth
                    type="text"
                    name="Email_Visibility"
                    label="Visibility"
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
                <Grid item xs={8}>
                  <Field
                    component={TextField}
                    fullWidth
                    type="text"
                    name="Phone"
                    label="Phone"
                    helperText=" "
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    fullWidth
                    type="text"
                    name="Phone_Visibility"
                    label="Visibility"
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
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting || !isValid}
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProfileForm;

EditProfileForm.propTypes = profileFormPropTypes;
