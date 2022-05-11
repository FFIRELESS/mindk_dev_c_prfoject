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

  const { isFetching, data } = useQuery('userFriends', () => getUserFriends(id));
  const friends = data?.data;

  if (friends === undefined || friends.length === 0) {
    return null;
  }
  return (
    <>
      {isFetching && <CircleLoader />}
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
            {/* <ImageList */}
            {/*  sx={{ */}
            {/*    gridAutoFlow: 'column', */}
            {/*    gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr)) !important', */}
            {/*    gridAutoColumns: 'minmax(120px, 1fr)', */}
            {/*  }} */}
            {/* > */}
            {/*  {friends.map((friend) => ( */}
            {/*    <ImageListItem> */}
            {/*      <div key={friend.User_ID}> */}
            {/*        <UserFriends friend={friend} /> */}
            {/*      </div> */}
            {/*    </ImageListItem> */}
            {/*  ))} */}
            {/* </ImageList> */}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default UserFriendsContainer;
