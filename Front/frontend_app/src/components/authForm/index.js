import React, {
  useCallback, useContext, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {
  Box, Card, CardContent, CardHeader, Grid, Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import config from '../../config/app.config';
import Context from '../../authContext';

const AuthForm = function () {
  const navigate = useNavigate();

  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth().then(() => {});
    }
  }, []);

  // not working
  const handleFacebookAuth = useCallback(() => {
    // axios.post('http://localhost:3003/auth/facebook', {
    //   access_token: data.accessToken,
    // }).then((response) => {
    //   setAuth({
    //     accessToken: response.accessToken,
    //     // user: parseJwt(response.accessToken),
    //   });
    // })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const handleGoogleAuth = useCallback((data) => {
    store.login(data).then(() => {});
  }, []);

  if (!store.isLogged) {
    return (
      <div className="App">
        <header className="App-header">
          <Box marginBottom={3}>
            <CardHeader
              title={(
                <Typography variant="h3" component="div" color="text.primary">
                  LINE.network
                </Typography>
                )}
              subheader={(
                <Typography color="text.secondary">
                  by FFIRELESS
                </Typography>
                )}
            />
          </Box>
          <Card sx={{ width: '32vh', maxWidth: 620 }}>
            <CardContent>
              <Grid container alignItems="center" direction="column">
                <Box width="68%">
                  <Box marginTop={1}>
                    <GoogleLogin
                      clientId={config.googleClientID}
                      onSuccess={handleGoogleAuth}
                      onFailure={(errors) => {
                        console.log(errors);
                      }}
                      cookiePolicy="single_host_origin"
                    />
                  </Box>
                  <Box marginTop={1}>
                    <FacebookLogin
                      appId={config.facebookAppID}
                      fields="name,email,picture"
                      size="small"
                      callback={handleFacebookAuth}
                    />
                  </Box>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </header>
      </div>
    );
  }
  navigate('/posts');
  return null;
};

export default observer(AuthForm);
