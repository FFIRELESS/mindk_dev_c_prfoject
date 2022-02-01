import { apiClient } from '../../../config/axios';

export const getUsers = async () => apiClient.get('/users');

export const getUser = async (id) => apiClient.get(`/users/${id}`);

export const getUserAvatar = async (id) => apiClient.get(`/users/${id}/avatar`);

export const setUserAvatar = async (id, avatar) => apiClient.post(`/users/${id}/avatar`, avatar);

export const editUser = async (id, user) => apiClient.put(`/users/${id}`, user);
