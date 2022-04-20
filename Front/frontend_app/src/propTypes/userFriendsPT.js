import PropTypes from 'prop-types';

export const userFriendsPropTypes = {
  friend: PropTypes.shape({
    User_ID: PropTypes.number.isRequired,
    University_ID: PropTypes.number.isRequired,
    Username: PropTypes.string.isRequired,
    Fullname: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Phone: PropTypes.string.isRequired,
  }),
};
