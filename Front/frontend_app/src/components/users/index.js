import React from 'react';

import {
  Avatar, Box, Button, Card, CardHeader, Typography,
} from '@mui/material';
import { userProfilePropTypes } from '../../propTypes/userProfilePT';

const config = require('../../config/app.config');

const Users = function ({ user }) {
  const userData = { ...user };
  const universityData = user?.University;

  let avatarUrl;

  if (!userData.Image.match(/^(https:\/\/)/)) {
    avatarUrl = `${config.apiURL}/users/${userData.User_ID}/avatar`;
  } else {
    avatarUrl = userData.Image;
  }

  return (
    <Box
      margin={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ width: '80vh', maxWidth: 620 }}>
        <CardHeader
          avatar={(
            <Avatar
              src={avatarUrl}
              sx={{ width: '10vh', height: '10vh' }}
              aria-label="username"
            >
              U
            </Avatar>
            )}
          action={(
            <Box border={1} justifyContent="center" margin={2}>
              <Button
                href={`users/${userData.User_ID}`}
                variant="contained"
                color="primary"
                fullWidth
              >
                GO TO PROFILE
              </Button>
            </Box>
            )}
          title={(
            <Typography variant="h6" component="div" color="text.primary">
              {userData.Username}
            </Typography>
            )}
          subheader={universityData?.University_Title}
        />
      </Card>
    </Box
>
  );
};

export default Users;

Users.propTypes = userProfilePropTypes;
