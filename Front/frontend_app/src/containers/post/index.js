import { useMutation, useQuery } from 'react-query';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import React from 'react';
import { Post } from '../../components/post';
import { deletePost, getPosts } from './api/crud';
import ResponsiveAppBar from '../../components/header/navbar';
import CircleLoader from '../../components/header/circleLoader';

const PostContainer = function () {
  const { isFetching: isFetchingPosts, data: dataPosts } = useQuery('posts', () => getPosts());
  const posts = dataPosts?.data || [];

  const { mutate, isLoading } = useMutation(deletePost);

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <ResponsiveAppBar />
      <Offset />
      {isFetchingPosts && isLoading && <CircleLoader />}
      <Box
        marginTop={3}
        marginBottom={-3}
        marginLeft={3}
        marginRight={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{ width: '80vh', maxWidth: 620 }}
        >
          <h1>All posts</h1>
        </Box>
      </Box>
      {posts.map((post) => <div key={post.Post_ID}><Post post={post} mutate={mutate} /></div>)}
    </>
  );
};

export default PostContainer;
