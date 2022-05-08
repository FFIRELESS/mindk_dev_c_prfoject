import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Box, Grid, Typography,
} from '@mui/material';

import { userFriendsPropTypes } from '../../propTypes/userFriendsPT';

const UserFriends = function ({ friend }) {
  const navigate = useNavigate();

  const friendUser = {
    ...friend.In_User || friend.Out_User,
  };

  const handleAvatarClick = () => {
    navigate(`/users/${friendUser.User_ID}`);
    window.location.reload();
  };

  return (
    <Box margin={0.5}>
      <Grid container justifyContent="center">
        <Avatar
          src={`http://localhost:3003/users/${friendUser.User_ID}/avatar`}
          sx={{ width: '10vh', height: '10vh' }}
          aria-label="username"
          onClick={handleAvatarClick}
        >
          U
        </Avatar>
      </Grid>

      <Typography
        width="11vh"
        textAlign="center"
        paddingTop={1}
        variant="body1"
        component="div"
        color="text.primary"
        sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
      >
        {friendUser.Username}
      </Typography>
    </Box>
  );
};

export default UserFriends;

UserFriends.propTypes = userFriendsPropTypes;
