import React from 'react';

import { useMutation } from 'react-query';
import { styled } from '@mui/material/styles';
import { createPost } from '../api/crud';
import AddEditForm from '../../../components/post/addEditForm';
import ResponsiveAppBar from '../../../components/header/navbar';
import CircleLoader from '../../../components/header/circleLoader';

const AddPostContainer = function () {
  const postData = {};
  const { mutate, isLoading } = useMutation(createPost);
  const isAddPostForm = true;

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <ResponsiveAppBar />
      <Offset />
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
