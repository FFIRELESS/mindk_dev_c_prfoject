import PropTypes from 'prop-types';

export const profileFormPropTypes = {
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
  id: PropTypes.string.isRequired,
  mutateUser: PropTypes.func.isRequired,
  mutateAvatar: PropTypes.func.isRequired,
  removeAvatar: PropTypes.func.isRequired,
  isLoadingUser: PropTypes.bool.isRequired,
  isLoadingAvatar: PropTypes.bool.isRequired,
};
