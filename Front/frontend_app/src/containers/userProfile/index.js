import React from 'react';

import {UserProfile} from "../../components/userProfile";
import {useQuery} from "react-query";
import {getUser} from "./api/crud";
import {Link, useParams} from "react-router-dom";
import {NotFound} from "../../components/NotFound";

const UserProfileContainer = () => {
    const {id} = useParams();

    if (!id.match(/^\d+$/)) {
        return <NotFound/>;
    }

    const {isFetching, data} = useQuery('user', () => getUser(id));
    const user = data?.data;

    console.log(id);
    console.log(user);

    if (user === undefined || user.length === 0) {
        return <NotFound/>;
    }
    return <>
        {isFetching && <div>Loading...</div>}
        <UserProfile user={user}/>
        <Link to="/users"><button>GO TO USERS LIST</button></Link>
        <Link to="/"><button>GO TO MAIN PAGE</button></Link>
    </>;
}

export default UserProfileContainer;