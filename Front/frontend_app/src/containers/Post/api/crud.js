import {apiClient} from "../../../config/axios";

export const getPosts = async () => {
    return apiClient.get('/posts');
}

export const getPost = async (id) => {
    return apiClient.get(`/posts/${id}`);
}

export const createPost = async (post) => {
    return await apiClient.post('/posts', post);
}

export const editPost = async (id, post) => {
    return await apiClient.put(`/posts/${id}`, post);
}

export const deletePost = async (id) => {
    return apiClient.delete(`/posts/${id}`);
}