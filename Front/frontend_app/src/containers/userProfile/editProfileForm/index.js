import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import React from 'react';
import EditProfileForm from '../../../components/userProfile/editProfileForm';
import { editUser, getUser } from '../../Users/api/crud';
import NotFound from '../../../components/404/NotFound';

const EditProfileContainer = function () {
  const { id } = useParams();
  const { mutate, isLoading } = useMutation(({ data }) => editUser(id, data));

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
      {isFetching && <div>Loading...</div>}
      <EditProfileForm userData={user} mutate={mutate} isLoading={isLoading} id={id} />
    </>
  );
};

export default EditProfileContainer;
