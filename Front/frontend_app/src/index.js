import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';

const light = {
  palette: {
    mode: 'light',
  },
};
const dark = {
  palette: {
    mode: 'dark',
  },
};
const isUserThemeDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const appliedTheme = createTheme(isUserThemeDark ? dark : light);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={appliedTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
