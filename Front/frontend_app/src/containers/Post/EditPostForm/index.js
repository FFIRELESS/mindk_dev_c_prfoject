import React from "react";

import {useMutation, useQuery} from "react-query";
import {editPost, getPost} from "../api/crud";
import {useParams} from "react-router-dom";
import {NotFound} from "../../../components/404/NotFound";
import AddEditForm from "../../../components/Post/AddEditForm";

const EditPostFormContainer = () => {
    const {id} = useParams();
    const  { mutate, isLoading } = useMutation(({id, data}) => editPost(id, data));
    const name = 'EDITING POST';

    if (!id.match(/^\d+$/)) {
        return <NotFound/>;
    }

    const {isFetching, data} = useQuery('post', () => getPost(id));
    const post = data?.data[0];

    if (post === undefined || post.length === 0) {
        return <NotFound/>;
    }

    return (
        <>
            {isFetching && <div>Loading...</div>}
            <AddEditForm formName={name} postData={post} mutate={mutate} isLoading={isLoading} id={id}/>
        </>
    );
}

export default EditPostFormContainer;