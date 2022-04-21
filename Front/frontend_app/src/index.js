import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import PostContainer from './containers/post';
import UserProfileContainer from './containers/userProfile';
import UsersContainer from './containers/users';
import EditPostFormContainer from './containers/post/editPostForm';
import EditProfileContainer from './containers/userProfile/editProfileForm';
import NotFound from './components/errors/notFound';
import Auth from './containers/auth';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/posts" element={<PostContainer />} />
            <Route path="/posts/:id/edit" element={<EditPostFormContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/users/:id" element={<UserProfileContainer />} />
            <Route path="/users/:id/edit" element={<EditProfileContainer />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
