import PropTypes from 'prop-types';

export const commentsPropTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    Comment_ID: PropTypes.number.isRequired,
    Post_ID: PropTypes.number.isRequired,
    User_ID: PropTypes.number.isRequired,
    Text: PropTypes.string.isRequired,
  })).isRequired,
};

export const commentsContainerPropTypes = {
  ...commentsPropTypes,
  postId: PropTypes.number.isRequired,
  reloadPosts: PropTypes.func,
};

export const commentsEditFromContainerPropTypes = {
  comment: PropTypes.shape({
    Comment_ID: PropTypes.number.isRequired,
    Post_ID: PropTypes.number.isRequired,
    User_ID: PropTypes.number.isRequired,
    Text: PropTypes.string.isRequired,
  }).isRequired,
  reloadPosts: PropTypes.func,
  setModalOpen: PropTypes.func,
};

export const commentsEditFormPropTypes = {
  ...commentsEditFromContainerPropTypes,
  editComment: PropTypes.func,
  isLoading: PropTypes.bool,
};
