import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const CircleLoader = function () {
  return (
    <Box
      margin={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
};

export default CircleLoader;
