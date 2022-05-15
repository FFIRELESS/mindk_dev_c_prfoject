import apiClient from '../../../config/axios';

export const getPosts = async () => apiClient.get('/posts');

export const getPost = async (id) => apiClient.get(`/posts/${id}`);

export const getPostComments = async (id) => apiClient.get(`/comments/${id}/post`);

export const createPost = async (postFormData) => apiClient.post('/posts', postFormData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const editPost = async (id, postFormData) => apiClient.put(`/posts/${id}`, postFormData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const deletePost = async (id) => apiClient.delete(`/posts/${id}`);

export const removePostImage = async (id) => apiClient.delete(`/posts/${id}/image`);
