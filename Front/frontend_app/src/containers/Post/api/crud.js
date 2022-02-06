import { apiClient } from '../../../config/axios';

export const getPosts = async () => apiClient.get('/posts');

export const getPost = async (id) => apiClient.get(`/posts/${id}`);

export const createPost = async (post) => apiClient.post('/posts', post, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const editPost = async (id, post) => apiClient.put(`/posts/${id}`, post);

export const deletePost = async (id) => apiClient.delete(`/posts/${id}`);

export const editPostImage = async (id, image) => apiClient.post(
  `/posts/${id}/image`,
  image,
  {
    headers: { 'Content-Type': 'multipart/form-data' },
  },
);

export const removePostImage = async (id) => apiClient.delete(`/posts/${id}/image`);
