import {Link} from "react-router-dom";
import React from "react";

export function UserProfile({ user }) {
    return (
        <div className="App-User">
            {
                user.map(({User_ID, University_ID, Username, Fullname, Image, Email, Phone}) =>
                    (<div key={User_ID}>
                        <b> User #{User_ID} from university #{University_ID} </b>
                        <div> {Username} </div>
                        <div> {Fullname} </div>
                        {Image}
                        <img src={`../../../../../API/uploads/${Image}`} alt="img"/>
                        <div> {Email} </div>
                        <div> {Phone} </div> <br/>
                    </div>))
            }
            <Link to="/users"><button>GO TO USERS LIST</button></Link>
            <Link to="/"><button>GO TO MAIN PAGE</button></Link>
        </div>
    );
}