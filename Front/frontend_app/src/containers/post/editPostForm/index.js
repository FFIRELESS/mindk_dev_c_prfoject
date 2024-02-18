import React from 'react';

import { useMutation, useQuery } from 'react-query';
import { editPost, getPost } from '../api/crud';
import AddEditForm from '../../../components/post/addEditForm';
import { editPostFormContainerPropTypes } from '../../../propTypes/editPostFormContainerPT';
import BackDrop from '../../../components/header/backdrop';

const EditPostFormContainer = function ({ id, reloadPosts, setOpen }) {
  const { mutate, isLoading } = useMutation((postFormData) => editPost(id, postFormData));
  const isAddPostForm = false;

  const { isFetching, data, refetch: reloadFormData } = useQuery('post', () => getPost(id));
  const post = data?.data;

  if (post !== undefined) {
    return (
      <>
        {isFetching && <BackDrop />}
        {isLoading && <BackDrop />}
        <AddEditForm
          isAddPostForm={isAddPostForm}
          postData={post}
          mutate={mutate}
          isLoading={isLoading}
          reloadPosts={reloadPosts}
          reloadFormData={reloadFormData}
          setOpen={setOpen}
        />
      </>
    );
  }
  return null;
};

export default EditPostFormContainer;

EditPostFormContainer.propTypes = editPostFormContainerPropTypes;
