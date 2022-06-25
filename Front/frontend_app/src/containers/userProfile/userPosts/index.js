import { useMutation } from 'react-query';
import {
  Box, Button, IconButton, Snackbar,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Post } from '../../../components/post';
import { deletePost } from '../../post/api/crud';
import CircleLoader from '../../../components/header/circleLoader';
import { userPostsContainerPropTypes } from '../../../propTypes/userPostsContainerPT';

const UserPostsContainer = function ({
  data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, refetch, isRefetching,
}) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { mutateAsync, isLoading } = useMutation(deletePost);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      {isRefetching && isFetching && isLoading && <CircleLoader />}
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
          <h2>User posts</h2>
        </Box>
      </Box>
      {data?.pages.map((group, i) => (
        <div key={i}>
          {group?.data?.data.map((post) => (
            <div key={post.Post_ID}>
              <Post
                post={post}
                mutate={mutateAsync}
                refetch={refetch}
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
          {!hasNextPage ? 'there is nothing to load' : 'load more...'}
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

export default UserPostsContainer;

UserPostsContainer.propTypes = userPostsContainerPropTypes;
