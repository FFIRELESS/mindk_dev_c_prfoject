import {
  Avatar,
  Box, CardContent, IconButton, List, ListItemAvatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { Grid } from '@material-ui/core';
import { useMutation } from 'react-query';
import Comments from '../../components/comments';
import { createComment, deleteComment } from './api/crud';
import { commentsFormSchema } from '../../components/comments/yup.validation.schema';
import { commentsContainerPropTypes } from '../../propTypes/commentsPT';
import authContext from '../../authContext';
import { checkAvatarUrlData } from '../../services/avatarLinkChecker';

const CommentsContainer = function ({ comments, postId, reloadPosts }) {
  const { store } = useContext(authContext);

  const { mutate: sendComment, isLoading } = useMutation(createComment);
  const { mutateAsync: removeComment } = useMutation(deleteComment);

  const commentUserAvatar = checkAvatarUrlData(store.user);

  const onFormSubmit = (data, actions) => {
    actions.setSubmitting(true);
    Object.assign(data, { Post_ID: postId });

    if (!isLoading) {
      actions.submitForm(sendComment(data)).then(() => {
        if (reloadPosts) {
          reloadPosts();
          actions.resetForm();
        }
      });
    }
    actions.setSubmitting(false);
  };

  return (
    <CardContent>
      {comments.length > 0
        && (
        <div>
          <Box marginTop="-5%"><h3>Comments:</h3></Box>
          <Box
            border={1}
            borderColor="silver"
            borderRadius={2}
            maxHeight={300}
            alignItems="center"
            sx={{
              overflow: 'auto',
            }}
          >
            <List>
              <Comments
                comments={comments}
                removeComment={removeComment}
                reloadPosts={reloadPosts}
              />
            </List>
          </Box>
        </div>
        )}

      <Formik
        onSubmit={onFormSubmit}
        initialValues={{ Text: '' }}
        validateOnBlur={false}
        validationSchema={commentsFormSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <ListItemAvatar>
                  <Avatar src={commentUserAvatar} />
                </ListItemAvatar>
              </Grid>
              <Grid item xs={10}>
                <Box margin={1}>
                  <Field
                    component={TextField}
                    fullWidth
                    type="text"
                    name="Text"
                    label="Type here..."
                  />
                </Box>
              </Grid>

              <Grid item xs={1}>
                <Box margin={1}>
                  <IconButton
                    disabled={isSubmitting || !isValid}
                    type="submit"
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </CardContent>
  );
};

export default CommentsContainer;

CommentsContainer.propTypes = commentsContainerPropTypes;
