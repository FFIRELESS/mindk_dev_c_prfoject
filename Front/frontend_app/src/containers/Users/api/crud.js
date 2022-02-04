import { apiClient } from '../../../config/axios';

export const getUsers = async () => apiClient.get('/users');

export const getUser = async (id) => apiClient.get(`/users/${id}`);

export const getUserAvatar = async (id) => apiClient.get(`/users/${id}/avatar`);

export const editUser = async (id, user, avatar) => {
  apiClient.put(`/users/${id}`, user);
  apiClient.post(`/users/${id}/avatar`, avatar, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
