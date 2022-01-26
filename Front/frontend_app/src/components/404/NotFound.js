import {Link} from "react-router-dom";
import React from "react";
import Img from "./404.png"

export var NotFound = function () {
    return <div className="App-header">
        <img src={Img} alt="" width={400}/> <br/><br/>
        <Link to="/"><button>GO TO MAIN PAGE</button></Link>
    </div>;
}