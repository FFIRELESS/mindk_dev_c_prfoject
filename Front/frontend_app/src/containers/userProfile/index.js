import React, { useContext } from 'react';

import { useInfiniteQuery, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import UserProfile from '../../components/userProfile';
import { getUser } from '../users/api/crud';
import ResponsiveAppBar from '../../components/header/navbar';
import NotFound from '../../components/errors/notFound';
import UserFriendsContainer from '../friends';
import CircleLoader from '../../components/header/circleLoader';
import UserRequestsContainer from '../requests';
import UserPostsContainer from './userPosts';
import { getUserPosts } from '../post/api/crud';
import Context from '../../authContext';

const UserProfileContainer = function () {
  const { id } = useParams();
  const { store } = useContext(Context);

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  if (!id.match(/^\d+$/)) {
    return <NotFound />;
  }

  const { isFetching, refetch, data } = useQuery('user', () => getUser(id));
  const user = data?.data;

  const {
    fetchNextPage,
    hasNextPage,
    refetch: refetchPosts,
    isFetchingNextPage,
    isFetching: isFetchingPosts,
    isRefetching,
    data: dataPosts,
  } = useInfiniteQuery(
    'posts',
    ({ pageParam = 0 }) => getUserPosts(pageParam, id),
    {
      getNextPageParam: (lastPage) => lastPage.data.nextOffset,
    },
  );

  if (user === undefined || user.length === 0) {
    return <NotFound />;
  }
  return (
    <>
      <ResponsiveAppBar refetch={refetchPosts} />
      <Offset />
      {isFetching && <CircleLoader />}
      <Box
        marginTop={3}
        marginBottom={-3}
        marginLeft={3}
        marginRight={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{ width: '80vh', maxWidth: 620 }}
        >
          <h1>Profile</h1>
          {store.user.role === 'admin' && (
          <Box marginTop={-3}>
            <h3 style={{ color: 'red' }}>ADMIN MODE</h3>
          </Box>
          )}
        </Box>
      </Box>
      <UserProfile refetchUserData={refetch} user={user} />
      <UserFriendsContainer />
      <UserRequestsContainer />
      <UserPostsContainer
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        refetch={refetchPosts}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetchingPosts}
        isRefetching={isRefetching}
        data={dataPosts}
      />
    </>
  );
};

export default observer(UserProfileContainer);
