import React from 'react';

import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { editPost, editPostImage, getPost } from '../api/crud';
import AddEditForm from '../../../components/Post/AddEditForm';
import NotFound from '../../../components/404/NotFound';
import ResponsiveAppBar from '../../../components/header/navbar';
import CircleLoader from '../../../components/header/CircleLoader';

const EditPostFormContainer = function () {
  const { id } = useParams();
  const { mutate, isLoading } = useMutation(({ data }) => editPost(id, data));
  const
    {
      mutate: mutateEditPostImage,
      // isLoading: loadingPostImage,
    } = useMutation(({ postImage }) => editPostImage(id, postImage));
  const name = 'EDITING POST';

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
        formName={name}
        postData={post}
        mutate={mutate}
        mutatePostImage={mutateEditPostImage}
        id={id}
      />
    </>
  );
};

export default EditPostFormContainer;
