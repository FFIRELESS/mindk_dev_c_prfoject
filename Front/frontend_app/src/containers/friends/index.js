import React from 'react';

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  Box, Card, CardContent, Grid,
} from '@mui/material';
import { getUserFriends } from '../users/api/crud';
import UserFriends from '../../components/friends';
import CircleLoader from '../../components/header/circleLoader';

const UserFriendsContainer = function () {
  const { id } = useParams();

  const { isFetching: isFetchFriends, data: friendsData } = useQuery('userFriends', () => getUserFriends(id));

  const friends = friendsData?.data;

  if (friends === undefined || friends.length === 0) {
    return null;
  }
  return (
    <>
      {isFetchFriends && <CircleLoader />}
      <Box
        margin={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ width: '80vh', maxWidth: 620 }}>
          <Box marginLeft={3}>
            <h1>Friends</h1>
            <Box marginTop={-2}>
              Friends total:
              {' '}
              { friends.length }
            </Box>
          </Box>
          <CardContent>
            <Box
              maxHeight={130}
              sx={{
                overflow: 'auto',
              }}
            >
              <Grid
                container
              >
                {friends.map((friend) => (
                  <div key={friend.id}>
                    <UserFriends friend={friend} />
                  </div>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default UserFriendsContainer;
