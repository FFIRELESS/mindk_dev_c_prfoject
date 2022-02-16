import React from 'react';

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import UserProfile from '../../components/userProfile';
import { getUser } from '../users/api/crud';
import ResponsiveAppBar from '../../components/header/navbar';
import NotFound from '../../components/errors/notFound';
import UserFriendsContainer from '../friends';
import CircleLoader from '../../components/header/circleLoader';

const UserProfileContainer = function () {
  const { id } = useParams();
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  if (!id.match(/^\d+$/)) {
    return <NotFound />;
  }

  const { isFetching, data } = useQuery('user', () => getUser(id));
  const user = data?.data;

  if (user === undefined || user.length === 0) {
    return <NotFound />;
  }
  return (
    <>
      <ResponsiveAppBar />
      <Offset />
      {isFetching && <CircleLoader />}
      <UserProfile user={user} />
      <UserFriendsContainer />
    </>
  );
};

export default UserProfileContainer;
