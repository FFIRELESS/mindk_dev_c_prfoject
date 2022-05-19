import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import Context from './authContext';
import Store from './store/store';

const light = {
  palette: {
    mode: 'light',
  },
};
const dark = {
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
    },
  },
};
const store = new Store();
const isUserThemeDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const appliedTheme = createTheme(isUserThemeDark ? dark : light);

const ContextProvider = function () {
  const value = useMemo(() => ({ store }), [store]);
  return (
    <Context.Provider value={value}>
      <CssBaseline />
      <App />
    </Context.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={appliedTheme}>
      <ContextProvider />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
