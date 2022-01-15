import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './index.css';
import App from "./App";
import {Add_article, Articles, Profile} from "./components/body";
import {ValidateDate, ValidatePostDigits, ValidatePostFile, ValidatePostUpper} from "./components/Post";
import {NotFound} from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.render(
  <React.StrictMode>
      <ErrorBoundary>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/articles" element={<Articles/>}/>
              <Route path="/add_article" element={<Add_article/>}/>
              <Route path="/posts_digits/:id" element={<ValidatePostDigits/>}/>
              <Route path="/posts_upper/:id" element={<ValidatePostUpper/>}/>
              <Route path="/posts_file/:id" element={<ValidatePostFile/>}/>
              <Route path="/date/:date" element={<ValidateDate/>}/>
              <Route path="*" element={<NotFound/>}/>
          </Routes>
      </BrowserRouter>
      </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
