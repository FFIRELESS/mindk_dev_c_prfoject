import apiClient from '../../../config/axios';

export const createComment = async (commentData) => apiClient.post('/comments', commentData);

export const editComment = async (id, commentData) => apiClient.put(`/comments/${id}`, commentData);

export const deleteComment = async (id) => apiClient.delete(`/comments/${id}`);
