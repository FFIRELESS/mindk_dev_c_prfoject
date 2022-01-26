import React from "react";
import AddPostForm from "../../../components/Post/AddPostForm";

const AddPostContainer = () => {
    const postData = {};

    return (
        <AddPostForm postData={postData}/>
    );
}

export default AddPostContainer;