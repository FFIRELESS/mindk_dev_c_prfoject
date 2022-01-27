import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Users = function ({ users }) {
  return (
    <>
      {
                users.map(({
                  User_ID, University_ID, Username, Fullname, Image, Email, Phone,
                }) => (
                  <div key={User_ID} className="container">
                    <div className="card">
                      <Link to={{ pathname: `/users/${User_ID}` }}>
                        <Button>
                          User #
                          {User_ID}
                        </Button>
                      </Link>
                      from university #
                      {University_ID}
                      <div>
                        {' '}
                        {Username}
                        {' '}
                      </div>
                      <div>
                        {' '}
                        {Fullname}
                        {' '}
                      </div>
                      <div>
                        {' '}
                        {Image}
                        {' '}
                      </div>
                      <div>
                        {' '}
                        {Email}
                        {' '}
                      </div>
                      <div>
                        {' '}
                        {Phone}
                        {' '}
                      </div>
                    </div>
                  </div>
                ))
            }
    </>
  );
};

export default Users;

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    User_ID: PropTypes.number.isRequired,
    University_ID: PropTypes.number.isRequired,
    Username: PropTypes.string.isRequired,
    Fullname: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Phone: PropTypes.string,
  })),
};

Users.defaultProps = {
  users: PropTypes.shape({
    Phone: 'Не указан',
  }),
};
