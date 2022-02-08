import { Box, Button } from '@mui/material';

export const HeaderContainer = function () {
  return (
    <div>
      <h1>MAIN PAGE</h1>
      <Box margin={1}>
        <Button
          href="/posts"
          variant="contained"
        >
          EXPLORE APP!
        </Button>
      </Box>
    </div>
  );
};
