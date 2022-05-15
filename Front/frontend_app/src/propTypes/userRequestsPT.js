import PropTypes from 'prop-types';

export const userRequestsPropTypes = {
  request: PropTypes.shape({
    Out_User: PropTypes.shape({
      User_ID: PropTypes.number.isRequired,
      Username: PropTypes.string.isRequired,
      Fullname: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired,
      University_Visibility: PropTypes.string.isRequired,
      University: PropTypes.shape({
        University_Title: PropTypes.string.isRequired,
      }),
    }),
    In_User: PropTypes.shape({
      User_ID: PropTypes.number.isRequired,
      Username: PropTypes.string.isRequired,
      Fullname: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired,
      University_Visibility: PropTypes.string.isRequired,
      University: PropTypes.shape({
        University_Title: PropTypes.string.isRequired,
      }),
    }),
  }),
};
