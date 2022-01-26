import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {UserProfile} from "../userProfile";

export function Users({ users }) {
    return (
        <>
            {
                users.map(({User_ID, University_ID, Username, Fullname, Image, Email, Phone}) =>
                    (<div key={User_ID} className="container">
                        <div className="card">
                        <Link to={{pathname: `/users/${User_ID}`}}><button>User #{User_ID}</button></Link>
                        from university #{University_ID}
                        <div> {Username} </div>
                        <div> {Fullname} </div>
                        <div> {Image} </div>
                        <div> {Email} </div>
                        <div> {Phone} </div>
                        </div>
                    </div>))
            }
        </>
    );
}

UserProfile.propTypes = {
    user: PropTypes.shape({
        User_ID: PropTypes.number.isRequired,
        University_ID:  PropTypes.number.isRequired,
        Username:  PropTypes.string.isRequired,
        Fullname:  PropTypes.string.isRequired,
        Image:  PropTypes.string.isRequired,
        Email:  PropTypes.string.isRequired,
        Phone:  PropTypes.string,
    })
}

UserProfile.defaultProps = {
    user: PropTypes.shape({
        Phone:  'Не указан'
    })
}