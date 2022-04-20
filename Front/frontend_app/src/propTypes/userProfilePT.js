import PropTypes from 'prop-types';

export const userProfilePropTypes = {
  user: PropTypes.shape({
    user: PropTypes.shape({
      User_ID: PropTypes.number.isRequired,
      University_ID: PropTypes.number.isRequired,
      Username: PropTypes.string.isRequired,
      Fullname: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Phone: PropTypes.string.isRequired,
    }),
    university: PropTypes.shape({
      University_Title: PropTypes.string.isRequired,
    }),
  }),
};
