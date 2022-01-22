import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

export function UserProfile({ user }) {
    return (
        <div className="App-User">
            <div key={user.User_ID}>
                <b> User #{user.User_ID} from university #{user.University_ID} </b>
                <div> {user.Username} </div>
                <div> {user.Fullname} </div>
                {user.Image}
                <img src={`../../../../../API/uploads/${user.Image}`} alt="img"/>
                <div> {user.Email} </div>
                <div> {user.Phone} </div> <br/>
            </div>
            <Link to="/users"><button>GO TO USERS LIST</button></Link>
            <Link to="/"><button>GO TO MAIN PAGE</button></Link>
        </div>
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