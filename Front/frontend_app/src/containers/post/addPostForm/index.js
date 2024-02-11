import React from 'react';

import { useMutation } from 'react-query';
import { createPost } from '../api/crud';
import AddEditForm from '../../../components/post/addEditForm';
import CircleLoader from '../../../components/header/circleLoader';
import { addPostContainerPropTypes } from '../../../propTypes/addPostContainerPT';

const AddPostContainer = function ({ reloadPosts, setOpen }) {
  const postData = {};
  const { mutate, isLoading } = useMutation(createPost);
  const isAddPostForm = true;

  return (
    <>
      {isLoading && <CircleLoader />}
      <AddEditForm
        isAddPostForm={isAddPostForm}
        postData={postData}
        mutate={mutate}
        isLoading={isLoading}
        reloadPosts={reloadPosts}
        setOpen={setOpen}
      />
    </>
  );
};

export default AddPostContainer;

AddPostContainer.propTypes = addPostContainerPropTypes;
