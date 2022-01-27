import React from 'react';

import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { getUsers } from './api/crud';
import Users from '../../components/Users';

const UsersContainer = function () {
  const { isFetching, data } = useQuery('users', () => getUsers());
  const users = data?.data || [];

  return (
    <>
      {isFetching && <div>Loading...</div>}
      <Users users={users} />
      <Link to="/"><Button>GO TO MAIN PAGE</Button></Link>
    </>
  );
};

export default UsersContainer;
