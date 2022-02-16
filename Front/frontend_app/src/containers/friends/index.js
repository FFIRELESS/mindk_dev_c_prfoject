import React from 'react';

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { getUserFriends } from '../users/api/crud';
import UserFriends from '../../components/friends';
import CircleLoader from '../../components/header/circleLoader';

const UserFriendsContainer = function () {
  const { id } = useParams();

  const { isFetching, data } = useQuery('userFriends', () => getUserFriends(id));
  const friends = data?.data;

  if (friends === undefined || friends.length === 0) {
    return null;
  }
  return (
    <>
      {isFetching && <CircleLoader />}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          maxWidth="80vh"
        >
          {friends.map((friend) => <div key={friend.User_ID}><UserFriends friend={friend} /></div>)}
        </Grid>
      </Box>
    </>
  );
};

export default UserFriendsContainer;
