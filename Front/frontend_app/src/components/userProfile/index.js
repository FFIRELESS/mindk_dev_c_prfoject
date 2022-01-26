import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

export function UserProfile({ user }) {
    return (
        <div className="App-User">
            <div key={user.User_ID}>
                <div className="user_header"><b> USER #{user.User_ID} FROM UNIVERSITY #{user.University_ID} </b></div>
                <div> <b><i>Username: </i></b>{user.Username} </div>
                <div> <b><i>Full name: </i></b>{user.Fullname} </div>
                <div> <b><i>Image path: </i></b>{user.Image} </div>
                {/*<img src={`../../../../../API/uploads/${user.Image}`} alt="img"/>*/}
                <div> <b><i>Email: </i></b>{user.Email} </div>
                <div> <b><i>Phone: </i></b>{user.Phone} </div> <br/>
            </div>
            <div className="row">
            <Link to="/users"><button>GO TO USERS LIST</button></Link>
            <Link to="/"><button>GO TO MAIN PAGE</button></Link>
        </div>
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