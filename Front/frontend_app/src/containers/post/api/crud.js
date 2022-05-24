import apiClient from '../../../config/axios';

export const getPosts = async (offset) => apiClient.get(`/posts/?offset=${offset}`);

export const getUserPosts = async (offset, id) => apiClient.get(`/posts/user/${id}/?offset=${offset}`);

export const getPost = async (id) => apiClient.get(`/posts/${id}`);

export const getPostImage = async (id) => apiClient.get(`/posts/${id}/image`);

export const getPostComments = async (id) => apiClient.get(`/comments/${id}/post`);

export const createPost = async (postFormData) => apiClient.post('/posts', postFormData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const editPost = async (id, postFormData) => apiClient.put(`/posts/${id}`, postFormData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const deletePost = async (id) => apiClient.delete(`/posts/${id}`);

export const removePostImage = async (id) => apiClient.delete(`/posts/${id}/image`);
