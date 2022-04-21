import React, { useCallback, useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import {
  Box, Grid, IconButton, Modal,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { modalBoxStyle } from '../../styles/modalStyle';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthForm = function () {
  const [auth, setAuth] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const localStorageAuth = localStorage.getItem('auth');
    if (localStorageAuth) {
      setAuth(JSON.parse(localStorageAuth));
    }
  });

  const handleModalClose = () => {
    setOpen(false);
  };

  // not working
  const handleFacebookAuth = useCallback((data) => {
    axios.post('http://localhost:3003/auth/facebook', {
      access_token: data.accessToken,
    }).then((response) => {
      setAuth({
        accessToken: response.accessToken,
        user: parseJwt(response.accessToken),
      });
    })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleGoogleAuth = useCallback((data) => {
    setOpen(true);
    axios.post('http://localhost:3003/auth/google', {
      access_token: data.accessToken,
    })
      .then((response) => {
        setAuth({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          user: parseJwt(response.data.accessToken),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  if (!auth.user) {
    return (
      <Box>
        <h1>LOGIN</h1>
        <Grid
          container
          justifyContent="center"
          direction="row"
          columnSpacing={{ xs: 2 }}
        >
          <Grid item xs={6}>
            <GoogleLogin
              clientId="506687723240-a0oprpgj8bq076v7lts8fjiouvta1r4o.apps.googleusercontent.com"
              onSuccess={handleGoogleAuth}
              onFailure={(errors) => {
                console.log(errors);
              }}
              cookiePolicy="single_host_origin"
            />
          </Grid>
          <Grid item xs={6}>
            <FacebookLogin
              appId="939712300251372"
              fields="name,email,picture"
              size="small"
              callback={handleFacebookAuth}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <div>
      <div>authorized</div>
      <div>{auth.user.User_ID}</div>
      <div>{auth.user.name}</div>
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
          {/* <EditProfileContainer /> */}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthForm;
