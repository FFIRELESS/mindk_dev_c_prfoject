import React from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  Avatar, Box, Card, Grid,
} from '@mui/material';

import AvatarGroup from '@mui/material/AvatarGroup';
import { userFriendsPropTypes } from '../../propTypes/userFriendsPT';

const config = require('../../config/app.config');

const UserFriends = function ({ friends }) {
  // const userContext = useContext(authContext);
  // console.log(userContext);
  //
  // const isCurrentUser = userContext.id === friendUser.User_ID;

  // TODO: method doesnt navigate to user
  // const handleAvatarClick = () => {
  //   navigate(`/users/${friendUser.User_ID}`);
  // };

  // if (isCurrentUser) {
  //   return (<Box marginLeft={1}>User hides his friends</Box>);
  // }

  return (
    <Box
      margin={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ width: '80vh', maxWidth: 620 }}>
        <Grid container direction="row" marginBottom={2}>
          <Grid item xs={5}>
            <Box marginLeft={3}>
              <h2>Friends</h2>
              <Box marginTop={-3}>
                Friends total:
                {' '}
                { friends.length }
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box marginTop={3} marginRight={3}>
              <AvatarGroup total={friends.length}>
                {friends.map((friend) => (
                  <Avatar
                    key={friend.id}
                    src={`${config.apiURL}/users/${{ ...friend.In_User || friend.Out_User }?.User_ID}/avatar`}
                    alt={friend.Username}
                  />
                ))}
              </AvatarGroup>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default UserFriends;

UserFriends.propTypes = userFriendsPropTypes;
