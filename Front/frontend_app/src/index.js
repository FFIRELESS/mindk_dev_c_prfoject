import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './index.css';
import {QueryClient, QueryClientProvider} from "react-query";
import App from "./App";
import {Profile} from "./components/body";
import {NotFound} from "./components/404/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import PostContainer from "./containers/Post";
import UserProfileContainer from "./containers/userProfile";
import UsersContainer from "./containers/Users";
import AddPostContainer from "./containers/Post/AddPostForm";
import EditPostFormContainer from "./containers/Post/EditPostForm";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client = {queryClient}>
          <ErrorBoundary>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<App/>}/>
                      <Route path="/posts" element={<PostContainer/>}/>
                      <Route path="/posts/:id/edit" element={<EditPostFormContainer/>}/>
                      <Route path="/users" element={<UsersContainer/>}/>
                      <Route path="/users/:id" element={<UserProfileContainer/>}/>
                      <Route path="/add_post" element={<AddPostContainer/>}/>
                      <Route path="/profile" element={<Profile/>}/>
                      <Route path="*" element={<NotFound/>}/>
                  </Routes>
              </BrowserRouter>
          </ErrorBoundary>
      </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
