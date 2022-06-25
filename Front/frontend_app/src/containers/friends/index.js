import React from 'react';

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUserFriends } from '../users/api/crud';
import CircleLoader from '../../components/header/circleLoader';
import UserFriends from '../../components/friends';

const UserFriendsContainer = function () {
  const { id } = useParams();

  const { isFetching: isFetchFriends, data: friendsData } = useQuery('userFriends', () => getUserFriends(id));

  const friends = friendsData?.data;

  if (friends === undefined || friends.length === 0) {
    return null;
  }
  return (
    <>
      {isFetchFriends && <CircleLoader />}
      <UserFriends friends={friends} />
    </>
  );
};

export default UserFriendsContainer;
