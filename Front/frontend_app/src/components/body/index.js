import {Link} from "react-router-dom";

export var Add_article = function () {
    return (
        <div>
            <p>THIS IS ADD_ARTICLE</p>
            <Link to="/"><button>GO TO MAIN PAGE</button></Link>
        </div>
    );
};

export var Profile = function () {
    return (
        <div className="card">
            <p><b>THIS IS YOUR PROFILE</b></p>
            Choose avatar:
            <form action={`http://localhost:3003/users/profile`} method="post" encType="multipart/form-data">
                <input type="file" name="avatar"/>
                <button type="submit">SEND</button>
            </form>
            <Link to="/"><button>GO TO MAIN PAGE</button></Link>
        </div>
    );
};