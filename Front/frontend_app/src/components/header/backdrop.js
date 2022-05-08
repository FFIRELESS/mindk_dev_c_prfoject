import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const BackDrop = function () {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;
