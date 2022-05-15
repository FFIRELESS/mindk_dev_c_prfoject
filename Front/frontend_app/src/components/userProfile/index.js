import React, { useContext, useState } from 'react';

import {
  Avatar, Box, Card, CardContent, CardHeader, IconButton, Modal, Tooltip, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

import { observer } from 'mobx-react-lite';
import EditProfileContainer from '../../containers/userProfile/editProfileForm';
import { modalBoxStyle } from '../../styles/modalStyle';
import { userProfilePropTypes } from '../../propTypes/userProfilePT';
import Context from '../../authContext';
import { checkAvatarUrlData } from '../../services/avatarLinkChecker';

const UserProfile = function ({ user }) {
  const { store } = useContext(Context);

  const [open, setOpen] = useState(false);

  const userData = { ...user };
  const universityData = user?.University;

  const isCurrentUser = store.user.User_ID === userData.User_ID;

  const avatarUrl = checkAvatarUrlData(userData);

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
        // sx={{ color: 'text.secondary' }}
      >
        <Card sx={{ width: '80vh', maxWidth: 620 }}>
          <CardHeader
            avatar={(
              <Avatar
                src={avatarUrl}
                sx={{ width: '20vh', height: '20vh' }}
                aria-label="username"
              >
                U
              </Avatar>
          )}
            title={(
              <Typography variant="h5" color="text.primary">
                {userData.Username}
              </Typography>
            )}
            action={(
                isCurrentUser && (
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
                )
          )}
            subheader={(
              <Typography color="text.secondary">
                {universityData?.University_Title}
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
            {userData.Phone && (
              <Typography variant="body2" color="text.secondary">
                {`Phone: ${userData.Phone}`}
              </Typography>
            )}
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

export default observer(UserProfile);

UserProfile.propTypes = userProfilePropTypes;
