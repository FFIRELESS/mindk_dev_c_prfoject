import { useInfiniteQuery, useMutation } from 'react-query';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import React from 'react';
import { Post } from '../../components/post';
import { deletePost, getPosts } from './api/crud';
import ResponsiveAppBar from '../../components/header/navbar';
import CircleLoader from '../../components/header/circleLoader';

const PostContainer = function () {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    data,
  } = useInfiniteQuery(
    'posts',
    ({ pageParam = 0 }) => getPosts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.data.nextOffset,
    },
  );

  const { mutate, isLoading } = useMutation(deletePost);

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <ResponsiveAppBar />
      <Offset />
      {isFetching && isLoading && <CircleLoader />}
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
      {data?.pages.map((group, i) => (
        <div key={i}>
          {group?.data?.data.map((post) => (
            <div key={post.Post_ID}>
              <Post post={post} mutate={mutate} />
            </div>
          ))}
        </div>
      ))}
      <Box
        margin={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {!hasNextPage ? 'there are nothing to load' : 'load more...'}
        </Button>
      </Box>
      {isFetchingNextPage && <CircleLoader />}
    </>
  );
};

export default PostContainer;
