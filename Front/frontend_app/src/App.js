import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Auth from './containers/auth';
import ErrorBoundary from './components/ErrorBoundary';
import PostContainer from './containers/post';
import EditPostFormContainer from './containers/post/editPostForm';
import UsersContainer from './containers/users';
import UserProfileContainer from './containers/userProfile';
import EditProfileContainer from './containers/userProfile/editProfileForm';
import NotFound from './components/errors/notFound';

import AuthContext from './authContext';

const queryClient = new QueryClient();

const App = function () {
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState({
    isLogged: true,
    id: 1,
    setUserData: () => {},
  });
  return (
    <AuthContext.Provider value={userData}>
      <ErrorBoundary>
        {/* <div className="App"> */}
        {/*  <header className="App-header"> */}
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/posts" element={<PostContainer />} />
              <Route path="/posts/:id/edit" element={<EditPostFormContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/users/:id" element={<UserProfileContainer />} />
              <Route path="/users/:id/edit" element={<EditProfileContainer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          {/*  </header> */}
          {/* </div> */}
        </QueryClientProvider>
      </ErrorBoundary>
    </AuthContext.Provider>
  );
};

export default App;
