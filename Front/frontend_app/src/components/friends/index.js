import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Box, Card, CardContent, Typography,
} from '@mui/material';

const UserFriends = function ({ friend }) {
  return (
    <Box margin={1}>
      <Card sx={{ width: '15vh' }}>
        <CardContent>
          <Avatar
            src={`http://localhost:3003/users/${friend.User_ID}/avatar`}
            sx={{ width: '10vh', height: '10vh' }}
            aria-label="username"
          >
            U
          </Avatar>

          <Typography paddingTop={2} variant="body1" component="div" color="text.primary">
            {friend.Username}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserFriends;

UserFriends.propTypes = {
  friend: PropTypes.shape({
    User_ID: PropTypes.number.isRequired,
    University_ID: PropTypes.number.isRequired,
    Username: PropTypes.string.isRequired,
    Fullname: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Phone: PropTypes.string.isRequired,
  }),
};
//
// UserFriends.defaultProps = {
//     user: PropTypes.shape({
//         Phone: 'Не указан',
//     }),
// };
