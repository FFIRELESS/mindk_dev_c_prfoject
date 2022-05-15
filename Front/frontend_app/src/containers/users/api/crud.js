import apiClient from '../../../config/axios';

export const getUsers = async () => apiClient.get('/users');
export const getUser = async (id) => apiClient.get(`/users/${id}`);
export const getUserFriends = async (id) => apiClient.get(`/user_friends/${id}`);
export const getIncRequests = async (id) => apiClient.get(`/user_friends/${id}/inReqs`);
export const getOutRequests = async (id) => apiClient.get(`/user_friends/${id}/outReqs`);
export const setUserAvatar = async (id, avatar) => apiClient.post(
  `/users/${id}/avatar`,
  avatar,
  {
    headers: { 'Content-Type': 'multipart/form-data' },
  },
);
export const removeUserAvatar = async (id) => apiClient.delete(`/users/${id}/avatar`);
export const editUser = async (id, user) => apiClient.put(`/users/${id}`, user);
