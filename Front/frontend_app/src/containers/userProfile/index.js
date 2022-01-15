import React from 'react';
import PropTypes from 'prop-types';

import {UserProfile} from "../../components/userProfile";

const UserProfileContainer = ({ firstName, lastName, middleName, birthdayYear, children, user }) => {
    const fullName = `${firstName} ${lastName} (${middleName})`;
    const age = 2021 - birthdayYear;

    return (<>
        {children}
        <UserProfile fullName={fullName} age={age} />
    </>);
}

const UserPropTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.shape({
        file: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
        })
    }),
    files: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    })),
    addrr: PropTypes.shape({
        main: PropTypes.shape({
            line1: PropTypes.string.isRequired,
            line2: PropTypes.string,
            city: PropTypes.string.isRequired,
            zip: PropTypes.number.isRequired
        }),
        alt: PropTypes.shape({
            line1: PropTypes.string,
            line2: PropTypes.string,
            city: PropTypes.string,
            zip: PropTypes.number
        })
    })
};

UserProfileContainer.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    middleName: PropTypes.string,
    birthdayYear: PropTypes.number.isRequired,
    user: PropTypes.shape(UserPropTypes),
    friends: PropTypes.arrayOf(PropTypes.shape(UserPropTypes))
};

UserProfileContainer.defaultProps = {
    middleName: 'N/A',
    addrr: ({
        main: ({
            line2: 'N/A'
        }),
        alt: ({
            line1: 'N/A',
            line2: 'N/A',
            city: 'N/A',
            zip: undefined
        })
    })
};

export default UserProfileContainer;