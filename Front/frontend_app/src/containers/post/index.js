import { useInfiniteQuery, useMutation } from 'react-query';
import { styled } from '@mui/material/styles';
import {
  Box, Button, IconButton, Snackbar,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Post } from '../../components/post';
import { deletePost, getPosts } from './api/crud';
import ResponsiveAppBar from '../../components/header/navbar';
import CircleLoader from '../../components/header/circleLoader';
import Context from '../../authContext';

const PostsContainer = function () {
  const { store } = useContext(Context);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    fetchNextPage,
    hasNextPage,
    refetch: reloadPosts,
    isFetchingNextPage,
    isFetching,
    isRefetching,
    data,
  } = useInfiniteQuery(
    'posts',
    ({ pageParam = 0 }) => getPosts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.data.nextOffset,
    },
  );

  const { mutateAsync, isLoading } = useMutation(deletePost);

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <ResponsiveAppBar refetch={reloadPosts} />
      <Offset />
      {isFetching && isRefetching && isLoading && <CircleLoader />}
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
          {store.user.role === 'admin' && (
            <Box marginTop={-3}>
              <h3 style={{ color: 'red' }}>ADMIN MODE</h3>
            </Box>
          )}
        </Box>
      </Box>
      {data?.pages.map((group, i) => (
        <div key={i}>
          {group?.data?.data.map((post) => (
            <div key={post.Post_ID}>
              <Post
                post={post}
                mutate={mutateAsync}
                reloadPosts={reloadPosts}
                setOpenSnackbar={setOpenSnackbar}
              />
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
          {!hasNextPage ? 'there is nothing more to load' : 'load more...'}
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Post deleted"
        action={(
          <>
            <Button size="small" disabled>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
            )}
      />
      {isFetchingNextPage && <CircleLoader />}
    </>
  );
};

export default PostsContainer;
