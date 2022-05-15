import apiClient from '../../../config/axios';

export const loginGoogle = async (data) => apiClient.post('http://localhost:3003/auth/google', {
  access_token: data.accessToken,
});

export const logout = async () => apiClient.post('http://localhost:3003/auth/logout');
