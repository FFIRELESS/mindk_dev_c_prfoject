import PropTypes from 'prop-types';

export const commentsPropTypes = {
  comment: PropTypes.shape({
    Comment_ID: PropTypes.number.isRequired,
    Post_ID: PropTypes.number.isRequired,
    User_ID: PropTypes.number.isRequired,
    Text: PropTypes.string,
  }).isRequired,
};

export const commentsContainerPropTypes = {
  id: PropTypes.number.isRequired,
};

export default { commentsPropTypes, commentsContainerPropTypes };
