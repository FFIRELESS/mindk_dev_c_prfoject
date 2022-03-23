import React from 'react';

import {
  Avatar, Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { userProfilePropTypes } from '../../propTypes/userProfilePT';

const Users = function ({ user }) {
  const userData = user.user;
  const universityData = user.university;

  let avatarUrl;

  if (!userData.Image.match(/^(https:\/\/)/)) {
    avatarUrl = `http://localhost:3003/users/${userData.User_ID}/avatar`;
  } else {
    avatarUrl = userData.Image;
  }

  return (
    <Box margin={1}>
      <Grid item xs={3}>
        <Card sx={{ width: '40vh' }}>
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
              <div>
                <IconButton aria-label="edit" disabled>
                  <MoreVertIcon />
                </IconButton>
              </div>
            )}
            title={(
              <Typography variant="h6" component="div" color="text.primary">
                {userData.Username}
              </Typography>
            )}
            subheader={universityData.University_Title}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom component="div" color="text.primary">
              {userData.Fullname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Email: ${userData.Email}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Phone: ${userData.Phone}`}
            </Typography>
          </CardContent>
          <Box margin={2}>
            <Button
              href={`users/${userData.User_ID}`}
              variant="contained"
              color="primary"
              fullWidth
            >
              GO TO PROFILE
            </Button>
          </Box>
        </Card>
      </Grid>
    </Box
>
  );
};

export default Users;

Users.propTypes = userProfilePropTypes;
