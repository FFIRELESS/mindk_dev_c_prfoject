import React from 'react';

import { useQuery } from 'react-query';
import { styled } from '@mui/material/styles';
import { getUsers } from './api/crud';
import Users from '../../components/users';
import ResponsiveAppBar from '../../components/header/navbar';
import CircleLoader from '../../components/header/circleLoader';

const UsersContainer = function () {
  const { isFetching, data } = useQuery('users', () => getUsers());
  const users = data?.data || [];
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <ResponsiveAppBar />
      <Offset />
      {isFetching && <CircleLoader />}
      {users.map((user) => <div key={user.User_ID}><Users user={user} /></div>)}
    </>
  );
};

export default UsersContainer;
