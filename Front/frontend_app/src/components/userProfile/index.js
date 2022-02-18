import React, { useState } from 'react';

import {
  Avatar, Box, Card, CardContent, CardHeader, IconButton, Modal, Tooltip, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

import EditProfileContainer from '../../containers/userProfile/editProfileForm';
import { modalBoxStyle } from '../../styles/modalStyle';
import { userProfilePropTypes } from '../../propTypes/userProfilePT';

const UserProfile = function ({ user }) {
  const userData = user.user;
  const universityData = user.university;

  const [open, setOpen] = useState(false);

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
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
                src={`http://localhost:3003/users/${userData.User_ID}/avatar`}
                sx={{ width: '20vh', height: '20vh' }}
                aria-label="username"
              >
                U
              </Avatar>
          )}
            action={(
              <div>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit" onClick={handleEditClick}>
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
                {userData.Username}
              </Typography>
          )}
            subheader={(
              <Typography color="text.secondary">
                {universityData.University_Title}
              </Typography>
          )}
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
        </Card>
      </Box>
      <Modal open={open}>
        <Box sx={modalBoxStyle}>
          <Box sx={{
            position: 'absolute',
            left: '89%',
            top: '2%',
          }}
          >
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <EditProfileContainer />
        </Box>
      </Modal>
    </>
  );
};

export default UserProfile;

UserProfile.propTypes = userProfilePropTypes;
