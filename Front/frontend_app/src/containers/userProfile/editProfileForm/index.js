import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import React from 'react';
import EditProfileForm from '../../../components/userProfile/editProfileForm';
import {
  editUser, removeUserAvatar, setUserAvatar,
} from '../../users/api/crud';
import NotFound from '../../../components/errors/notFound';
import { editUserContainerPropTypes } from '../../../propTypes/editUserContainerPT';

const EditProfileContainer = function ({ user, refetchUserData, setOpen }) {
  const { id } = useParams();
  const
    {
      mutate: mutateUserData,
      isLoading: loadingUserData,
    } = useMutation((data) => editUser(id, data));
  const
    {
      mutate: mutateUserAvatar,
      isLoading: loadingUserAvatar,
    } = useMutation((avatar) => setUserAvatar(id, avatar));
  const
    {
      mutate: removeAvatar,
    } = useMutation(() => removeUserAvatar(id));

  if (!id.match(/^\d+$/)) {
    return <NotFound />;
  }

  if (user === undefined || user.length === 0) {
    return <NotFound />;
  }

  return (
    <EditProfileForm
      user={user}
      mutateUser={mutateUserData}
      isLoadingUser={loadingUserData}
      mutateAvatar={mutateUserAvatar}
      removeAvatar={removeAvatar}
      isLoadingAvatar={loadingUserAvatar}
      refetchUserData={refetchUserData}
      setOpen={setOpen}
    />
  );
};

export default EditProfileContainer;

EditProfileContainer.propTypes = editUserContainerPropTypes;
