import {Link} from "react-router-dom";

export var HeaderContainer = function () {

    return (
        <div>
            <p>*MAIN PAGE*</p>
            <Link to="/posts"><button>SHOW ARTICLES</button></Link>
            <Link to="/add_article"><button>ADD ARTICLE</button></Link>
            <Link to="/profile"><button>SHOW PROFILE</button></Link>
            <Link to="/users"><button>SHOW USERS</button></Link>
        </div>
    );
};