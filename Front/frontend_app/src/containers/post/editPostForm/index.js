import React from 'react';

import { useMutation, useQuery } from 'react-query';
import { editPost, getPost } from '../api/crud';
import AddEditForm from '../../../components/post/addEditForm';
import NotFound from '../../../components/errors/notFound';
import CircleLoader from '../../../components/header/circleLoader';
import { editPostFormContainerPropTypes } from '../../../propTypes/editPostFormContainerPT';

const EditPostFormContainer = function ({ id }) {
  const { mutate, isLoading } = useMutation((postFormData) => editPost(id, postFormData));
  const isAddPostForm = false;

  const { isFetching, data } = useQuery('post', () => getPost(id));
  const post = data?.data;

  if (post === undefined || post.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      {isFetching && <CircleLoader />}
      {isLoading && <CircleLoader />}
      <AddEditForm
        isAddPostForm={isAddPostForm}
        postData={post}
        mutate={mutate}
      />
    </>
  );
};

export default EditPostFormContainer;

EditPostFormContainer.propTypes = editPostFormContainerPropTypes;
