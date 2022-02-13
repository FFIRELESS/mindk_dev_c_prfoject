import React, { useCallback, useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const TestAuth = function () {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const localStorageAuth = localStorage.getItem('auth');
    if (localStorageAuth) {
      setAuth(JSON.parse(localStorageAuth));
    }
  });

  const handleGoogleAuth = useCallback((data) => {
    axios.post('http://localhost:3003/auth/google', {
      access_token: data.access_token,
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
  console.log(auth);

  if (!auth.user) {
    return (
      <div>
        <GoogleLogin
          clientId="506687723240-a0oprpgj8bq076v7lts8fjiouvta1r4o.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={handleGoogleAuth}
          onFailure={(errors) => {
            console.log(errors);
          }}
          cookiePolicy="single_host_origin"
        />
      </div>
    );
  }

  return (
    <div>
      <div>authorized</div>
      <div>{auth.user.User_ID}</div>
      <div>{auth.user.name}</div>
    </div>
  );
};

export default TestAuth;
