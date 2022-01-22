import React from 'react';

import {useQuery} from "react-query";
import {getUsers} from "./api/crud";
import {Users} from "../../components/Users";
import {Link} from "react-router-dom";

const UsersContainer = () => {
    const {isFetching, data} = useQuery('users', () => getUsers());
    const users = data?.data || [];

    return <>
        {isFetching && <div>Loading...</div>}
        <Users users={users}/>
        <Link to="/"><button>GO TO MAIN PAGE</button></Link>
    </>;
}

export default UsersContainer;