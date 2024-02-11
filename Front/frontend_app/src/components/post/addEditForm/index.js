import React, { useState } from 'react';
import { serialize } from 'object-to-formdata';

import {
  Box, Button, CardMedia, Grid, MenuItem,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';

import { handleImageError } from '../../../services/componentHandlers';
import { visibilityVars } from '../../userProfile/editProfileForm/visibilityOptions';
import { postFormSchema } from './yup.validation.schema';
import { postFormPropTypes } from '../../../propTypes/postFormPT';

const dataURLtoBlob = require('blueimp-canvas-to-blob');
const config = require('../../../config/app.config');

const AddEditForm = function ({
  postData, mutate, isAddPostForm, isLoading, reloadPosts, refetchFormData, setOpen,
}) {
  const [image, setImage] = useState();
  const [filename, setFilename] = useState();

  let postImagePath;

  if (isAddPostForm) {
    postImagePath = null;
  } else {
    postImagePath = `${config.apiURL}/posts/${postData.Post_ID}/image`;
  }
  // TODO: add removing post image method
  // const
  //   {
  //     mutate: rmPostImage,
  //   } = useMutation(() => removePostImage(id));

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file.type.match('image.*') && file.size < 100000000) {
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

  const onFormSubmit = (data, actions) => {
    actions.setSubmitting(true);
    const formData = serialize(data);
    if (image) {
      formData.append('image', dataURLtoBlob(image), filename);
    }
    actions.setSubmitting(false);
    if (!isLoading) {
      actions.submitForm(mutate(formData)).then(() => {
        if (reloadPosts) {
          reloadPosts();
          refetchFormData();
        }
        setOpen(false);
      });
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={20}>
        <Box margin={1}><h1>{isAddPostForm ? 'ADD POST' : 'EDIT POST'}</h1></Box>
        <Formik
          onSubmit={onFormSubmit}
          initialValues={postData}
          validationSchema={postFormSchema}
          validateOnBlur={false}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Box margin={1}>
                <Field
                  component={TextField}
                  fullWidth
                  type="text"
                  name="Title"
                  label="Title"
                  helperText="Please Enter Post Title"
                />
                {/* <Field */}
                {/*  component={FormikAutocomplete} */}
                {/*  name="Visibility" */}
                {/*  label="Visibility" */}
                {/*  helperText="Please Enter Visibility" */}
                {/*  options={visibilityVars} */}
                {/* /> */}
              </Box>
              <Box margin={1}>
                <Field
                  component={TextField}
                  fullWidth
                  multiline
                  maxRows={8}
                  type="text"
                  name="Text"
                  label="Text"
                  helperText="Please Enter Post Text"
                />
              </Box>
              <Box margin={1}>
                <Field
                  component={TextField}
                  fullWidth
                  type="text"
                  name="Visibility"
                  label="Visibility"
                  helperText="Please Enter Visibility"
                  select
                  variant="standard"
                  defaultValue="all"
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
              </Box>
              {image ? (
                <Box margin={1}>
                  <img width="150vh" src={image} alt="Post pic." />
                </Box>
              ) : (
                <Box margin={1}>
                  <Grid container maxWidth="10vh">
                    <CardMedia
                      component="img"
                      image={postImagePath}
                      onError={handleImageError}
                    />
                  </Grid>
                </Box>
              )}
              <Box margin={1}>
                <Button variant="outlined" component="label">
                  Add image
                  <input type="file" hidden onChange={handleChange} />
                </Button>
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
      </Grid>
    </Grid>
  );
};

export default AddEditForm;

AddEditForm.propTypes = postFormPropTypes;
