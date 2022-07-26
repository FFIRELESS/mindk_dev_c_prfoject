import { useMutation } from 'react-query';
import EditCommentForm from '../../../components/comments/editForm';
import { editComment } from '../api/crud';
import { commentsEditFromContainerPropTypes } from '../../../propTypes/commentsPT';

const EditCommentFormContainer = function ({ reloadPosts, comment, setModalOpen }) {
  const { mutateAsync: changeComment, isLoading } = useMutation(editComment);
  return (
    <EditCommentForm
      comment={comment}
      editComment={changeComment}
      reloadPosts={reloadPosts}
      isLoading={isLoading}
      setModalOpen={setModalOpen}
    />
  );
};

export default EditCommentFormContainer;

EditCommentFormContainer.propTypes = commentsEditFromContainerPropTypes;
