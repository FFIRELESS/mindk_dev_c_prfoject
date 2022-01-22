import {Link} from "react-router-dom";
import React from "react";

export var NotFound = function () {
    return <>
        404 Not Found <br/>
        <Link to="/"><button>GO TO MAIN PAGE</button></Link>
    </>;
}