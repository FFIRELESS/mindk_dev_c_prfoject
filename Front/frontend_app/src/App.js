import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { observer } from 'mobx-react-lite';
import Auth from './containers/auth';
import ErrorBoundary from './components/ErrorBoundary';
import PostContainer from './containers/post';
import EditPostFormContainer from './containers/post/editPostForm';
import UsersContainer from './containers/users';
import UserProfileContainer from './containers/userProfile';
import EditProfileContainer from './containers/userProfile/editProfileForm';
import NotFound from './components/errors/notFound';
import Context from './authContext';

const queryClient = new QueryClient();

const App = function () {
  const store = useContext(Context);

  return (
    <ErrorBoundary>
      <Context.Provider value={store}>
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
        </QueryClientProvider>
      </Context.Provider>
    </ErrorBoundary>
  );
};

export default observer(App);
