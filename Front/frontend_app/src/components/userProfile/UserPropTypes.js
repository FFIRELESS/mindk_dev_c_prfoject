import PropTypes from "prop-types";

export const UserPropTypes = {
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