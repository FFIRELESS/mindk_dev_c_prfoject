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
import {Add_article, Profile} from "./components/body";
import {NotFound} from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import PostContainer from "./containers/Post";
import UserProfileContainer from "./containers/userProfile";
import UsersContainer from "./containers/Users";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client = {queryClient}>
          <ErrorBoundary>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<App/>}/>
                      <Route path="/posts" element={<PostContainer/>}/>
                      <Route path="/users" element={<UsersContainer/>}/>
                      <Route path="/users/:id" element={<UserProfileContainer/>}/>
                      <Route path="/add_article" element={<Add_article/>}/>
                      <Route path="/profile" element={<Profile/>}/>
                      <Route path="*" element={<NotFound/>}/>
                  </Routes>
              </BrowserRouter>
          </ErrorBoundary>
      </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
