import React from 'react';
import PropTypes from 'prop-types';

import {
  Avatar, Box, Card, CardContent, CardHeader, IconButton, Tooltip, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UserProfile = function ({ user }) {
  return (
    <Box
      margin={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ width: '80vh', maxWidth: 800 }}>
        <CardHeader
          avatar={(
            <Avatar
              src={`http://localhost:3003/users/${user.User_ID}/avatar`}
              sx={{ width: '20vh', height: '20vh' }}
              aria-label="username"
            >
              U
            </Avatar>
          )}
          action={(
            <div>
              <Tooltip title="Edit">
                <IconButton aria-label="edit" href={`${user.User_ID}/edit`}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <IconButton aria-label="settings" disabled>
                <MoreVertIcon />
              </IconButton>
            </div>
          )}
          title={(
            <Typography variant="h4" component="div" color="text.primary">
              {user.Username}
            </Typography>
          )}
          subheader={(
            <Typography color="text.secondary">
              {user.university.University_Title}
            </Typography>
          )}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom component="div" color="text.primary">
            {user.Fullname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Email: ${user.Email}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Phone: ${user.Phone}`}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;

UserProfile.propTypes = {
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
};

UserProfile.defaultProps = {
  user: PropTypes.shape({
    Phone: 'Не указан',
  }),
};
