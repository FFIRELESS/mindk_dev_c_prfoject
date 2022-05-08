import React from 'react';

import { useMutation } from 'react-query';
import { createPost } from '../api/crud';
import AddEditForm from '../../../components/post/addEditForm';
import CircleLoader from '../../../components/header/circleLoader';

const AddPostContainer = function () {
  const postData = {};
  const { mutate, isLoading } = useMutation(createPost);
  const isAddPostForm = true;

  return (
    <>
      {isLoading && <CircleLoader />}
      <AddEditForm
        isAddPostForm={isAddPostForm}
        postData={postData}
        mutate={mutate}
      />
    </>
  );
};

export default AddPostContainer;
