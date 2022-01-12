import {Link} from "react-router-dom";

export var Articles = function () {
    return (
        <div>
            <p>THIS IS ARTICLE</p>
            <Link to="/"><button>GO TO MAIN PAGE</button></Link>
        </div>
    );
};

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
        <div>
            <p>THIS IS PROFILE</p>
            <Link to="/"><button>GO TO MAIN PAGE</button></Link>
        </div>
    );
};