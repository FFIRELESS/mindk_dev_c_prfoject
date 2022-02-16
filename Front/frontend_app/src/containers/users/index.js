import React from 'react';

import { useQuery } from 'react-query';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getUsers } from './api/crud';
import Users from '../../components/users';
import ResponsiveAppBar from '../../components/header/navbar';

const UsersContainer = function () {
  const { isFetching, data } = useQuery('users', () => getUsers());
  const users = data?.data || [];
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <ResponsiveAppBar />
      <Offset />
      {isFetching && <div>Loading...</div>}
      <Grid
        container
        direction="row"
        justifyContent="center"
      >
        {users.map((user) => <div key={user.user.User_ID}><Users user={user} /></div>)}
      </Grid>
    </>
  );
};

export default UsersContainer;
