import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Box, Grid, Typography,
} from '@mui/material';
import { checkAvatarUrlData } from '../../services/avatarLinkChecker';
import { userRequestsPropTypes } from '../../propTypes/userRequestsPT';

// import { userFriendsPropTypes } from '../../propTypes/userFriendsPT';
// import authContext from '../../authContext';

const UserRequests = function ({ request }) {
  const navigate = useNavigate();

  const userAvatar = checkAvatarUrlData(request);

  // if (request.In_User !== undefined || request.Out_User !== undefined) {
  //   return null;
  // }

  // const userContext = useContext(authContext);
  // console.log(userContext);
  //
  // const isCurrentUser = userContext.id === friendUser.User_ID;

  const handleAvatarClick = () => {
    navigate(`/users/${request.User_ID}`);
    window.location.reload();
  };

  // if (isCurrentUser) {
  //   return (<Box marginLeft={1}>User hide his friends</Box>);
  // }

  return (
    <Box margin={0.5}>
      <Grid container justifyContent="center">
        <Avatar
          src={userAvatar}
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
        {request.Username}
      </Typography>
    </Box>
  );
};

export default UserRequests;

UserRequests.propTypes = userRequestsPropTypes;
