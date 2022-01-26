import {Link} from "react-router-dom";

export var EditProfileForm = function ({id}) {
    return (
        <>
            <div className="card">
                <p><b>THIS IS YOUR PROFILE</b></p>
                Choose avatar:
                <form action={`http://localhost:3003/users/${id}/avatar`} method="post" encType="multipart/form-data">
                    <input type="file" name="avatar"/>
                    <button type="submit">SEND</button>
                </form>
                <Link to="/"><button>GO TO MAIN PAGE</button></Link>
            </div>
        </>
    );
};