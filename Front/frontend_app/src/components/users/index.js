import PropTypes from 'prop-types';
import {
  Avatar, Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

const Users = function ({ user }) {
  const userData = user.user;
  const universityData = user.user.university;

  return (
    <Box margin={1}>
      <Grid item xs={3}>
        <Card sx={{ width: '40vh' }}>
          <CardHeader
            avatar={(
              <Avatar
                src={`http://localhost:3003/users/${userData.User_ID}/avatar`}
                sx={{ width: '10vh', height: '10vh' }}
                aria-label="username"
              >
                U
              </Avatar>
            )}
            action={(
              <div>
                <IconButton aria-label="edit" href={`users/${userData.User_ID}/edit`}>
                  <EditIcon />
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

Users.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.shape({
      User_ID: PropTypes.number.isRequired,
      University_ID: PropTypes.number.isRequired,
      Username: PropTypes.string.isRequired,
      Fullname: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Phone: PropTypes.string,
      university: PropTypes.shape({
        University_Title: PropTypes.string.isRequired,
      }),
    }),
  }),
};

Users.defaultProps = {
  user: PropTypes.shape({
    Phone: 'Не указан',
  }),
};
