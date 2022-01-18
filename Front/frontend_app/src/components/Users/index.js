import {Link} from "react-router-dom";

export function Users({ users }) {
    return (
        <>
            {
                users.map(({User_ID, University_ID, Username, Fullname, Image, Email, Phone}) =>
                    (<div key={User_ID}>
                        <Link to={{pathname: `/users/${User_ID}`}}><button>User #{User_ID}</button></Link>
                        from university #{University_ID}
                        <div> {Username} </div>
                        <div> {Fullname} </div>
                        <div> {Image} </div>
                        <div> {Email} </div>
                        <div> {Phone} </div> <br/>
                    </div>))
            }
        </>
    );
}