import React from 'react';

import { useMutation, useQuery } from 'react-query';
import { editPost, getPost } from '../api/crud';
import AddEditForm from '../../../components/post/addEditForm';
import NotFound from '../../../components/errors/notFound';
import { editPostFormContainerPropTypes } from '../../../propTypes/editPostFormContainerPT';
import BackDrop from '../../../components/header/backdrop';

const EditPostFormContainer = function ({ id, refetch, setOpen }) {
  const { mutate, isLoading } = useMutation((postFormData) => editPost(id, postFormData));
  const isAddPostForm = false;

  const { isFetching, data } = useQuery('post', () => getPost(id));
  const post = data?.data;

  if (post === undefined || post.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      {isFetching && <BackDrop />}
      {isLoading && <BackDrop />}
      <AddEditForm
        isAddPostForm={isAddPostForm}
        postData={post}
        mutate={mutate}
        isLoading={isLoading}
        refetch={refetch}
        setOpen={setOpen}
      />
    </>
  );
};

export default EditPostFormContainer;

EditPostFormContainer.propTypes = editPostFormContainerPropTypes;
