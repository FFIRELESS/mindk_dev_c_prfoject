import React from "react";

import EditPostForm from "../../../components/Post/EditPostForm";
import {useQuery} from "react-query";
import {getPost} from "../api/crud";
import {useParams} from "react-router-dom";
import {NotFound} from "../../../components/404/NotFound";

const EditPostFormContainer = () => {
    const {id} = useParams();

    if (!id.match(/^\d+$/)) {
        return <NotFound/>;
    }

    const {isFetching, data} = useQuery('post', () => getPost(id));
    const post = data?.data[0];

    if (post === undefined || post.length === 0) {
        return <NotFound/>;
    }

    const postData = {
        User_ID: post.User_ID,
        Title: post.Title,
        Text: post.Text,
        Visibility: post.Visibility
    };

    return (
        <>
            {isFetching && <div>Loading...</div>}
            <EditPostForm id={id} postData={postData}/>
        </>
    );
}

export default EditPostFormContainer;