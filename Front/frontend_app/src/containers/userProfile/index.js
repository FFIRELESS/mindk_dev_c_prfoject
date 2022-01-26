import React from 'react';

import {UserProfile} from "../../components/userProfile";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {NotFound} from "../../components/404/NotFound";
import {getUser} from "../Users/api/crud";
import ResponsiveAppBar from "../../components/header/navbar";
import {styled} from "@mui/material/styles";

const UserProfileContainer = () => {
    const {id} = useParams();
    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

    if (!id.match(/^\d+$/)) {
        return <NotFound/>;
    }

    const {isFetching, data} = useQuery('user', () => getUser(id));
    const user = data?.data[0];

    if (user === undefined || user.length === 0) {
        return <NotFound/>;
    }
    return <>
        <ResponsiveAppBar/>
        <Offset />
        {isFetching && <div>Loading...</div>}
        <UserProfile user={user}/>
    </>;
}

export default UserProfileContainer;