import React from 'react';

import { useMutation } from 'react-query';
import { createPost } from '../api/crud';
import AddEditForm from '../../../components/Post/AddEditForm';
import ResponsiveAppBar from '../../../components/header/navbar';

const AddPostContainer = function () {
  const postData = {};
  const { mutate, isLoading } = useMutation(createPost);
  const name = 'NEW POST';

  return (
    <>
      <ResponsiveAppBar />
      <AddEditForm formName={name} postData={postData} mutate={mutate} isLoading={isLoading} />
    </>
  );
};

export default AddPostContainer;
