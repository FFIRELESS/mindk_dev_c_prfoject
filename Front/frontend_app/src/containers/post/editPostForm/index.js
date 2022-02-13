import React from 'react';

import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { editPost, getPost } from '../api/crud';
import AddEditForm from '../../../components/post/addEditForm';
import NotFound from '../../../components/errors/notFound';
import ResponsiveAppBar from '../../../components/header/navbar';
import CircleLoader from '../../../components/header/circleLoader';

const EditPostFormContainer = function () {
  const { id } = useParams();
  const { mutate, isLoading } = useMutation((postFormData) => editPost(id, postFormData));
  const isAddPostForm = false;

  if (!id.match(/^\d+$/)) {
    return <NotFound />;
  }

  const { isFetching, data } = useQuery('post', () => getPost(id));
  const post = data?.data[0];

  if (post === undefined || post.length === 0) {
    return <NotFound />;
  }

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <ResponsiveAppBar />
      <Offset />
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
