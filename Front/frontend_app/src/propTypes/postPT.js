import PropTypes from 'prop-types';

export const postPropTypes = {
  post: PropTypes.shape({
    post: PropTypes.shape({
      Post_ID: PropTypes.number.isRequired,
      User_ID: PropTypes.number.isRequired,
      Title: PropTypes.string.isRequired,
      Text: PropTypes.string.isRequired,
      Timestamp: PropTypes.string.isRequired,
      Visibility: PropTypes.string.isRequired,
      Image: PropTypes.string,
      user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Fullname: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
  refetch: PropTypes.func,
};
