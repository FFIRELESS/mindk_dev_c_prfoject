import {
  Box, Button, Grid,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';
import { commentsFormSchema } from '../yup.validation.schema';
import { commentsEditFormPropTypes } from '../../../propTypes/commentsPT';

const EditCommentForm = function ({
  comment, editComment, reloadPosts, isLoading, setModalOpen,
}) {
  const onFormSubmit = (data, actions) => {
    actions.setSubmitting(true);
    if (!isLoading) {
      actions.submitForm(editComment(comment.Comment_ID, data)).then(() => {
        if (reloadPosts) {
          reloadPosts();
        }
        setModalOpen(false);
      });
    }
    actions.setSubmitting(false);
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
        <Box margin={1}><h1>EDIT COMMENT</h1></Box>
        <Formik
          onSubmit={onFormSubmit}
          initialValues={comment}
          validateOnBlur={false}
          validationSchema={commentsFormSchema}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Box margin={1}>
                <Field
                  component={TextField}
                  fullWidth
                  type="text"
                  name="Text"
                  label="Edit comment"
                />
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

export default EditCommentForm;

EditCommentForm.propTypes = commentsEditFormPropTypes;
