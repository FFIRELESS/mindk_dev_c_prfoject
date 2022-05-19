import PropTypes from 'prop-types';

export const postFormPropTypes = {
  postData: PropTypes.shape({
    Post_ID: PropTypes.number,
    User_ID: PropTypes.number,
    Title: PropTypes.string,
    Text: PropTypes.string,
    Timestamp: PropTypes.string,
    Visibility: PropTypes.string,
  }).isRequired,
  isAddPostForm: PropTypes.bool.isRequired,
  mutate: PropTypes.func.isRequired,
  refetch: PropTypes.func,
  setOpen: PropTypes.func,
};
