import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import React from 'react';
import EditProfileForm from '../../../components/userProfile/editProfileForm';
import {
  editUser, getUser, removeUserAvatar, setUserAvatar,
} from '../../Users/api/crud';
import NotFound from '../../../components/404/NotFound';
import ResponsiveAppBar from '../../../components/header/navbar';

const EditProfileContainer = function () {
  const { id } = useParams();
  const
    {
      mutate: mutateUserData,
      isLoading: loadingUserData,
    } = useMutation(({ data, avatar }) => editUser(id, data, avatar));
  const
    {
      mutate: mutateUserAvatar,
      isLoading: loadingUserAvatar,
    } = useMutation(({ avatar }) => setUserAvatar(id, avatar));
  const
    {
      mutate: removeAvatar,
    } = useMutation(() => removeUserAvatar(id));

  if (!id.match(/^\d+$/)) {
    return <NotFound />;
  }

  const { isFetching, data } = useQuery('user', () => getUser(id));
  const user = data?.data[0];

  if (user === undefined || user.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <ResponsiveAppBar />
      {isFetching && <div>Loading...</div>}
      <EditProfileForm
        userData={user}
        mutateUser={mutateUserData}
        isLoadingUser={loadingUserData}
        mutateAvatar={mutateUserAvatar}
        removeAvatar={removeAvatar}
        isLoadingAvatar={loadingUserAvatar}
        id={id}
      />
    </>
  );
};

export default EditProfileContainer;
