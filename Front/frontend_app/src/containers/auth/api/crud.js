import apiClient from '../../../config/axios';

export const loginGoogle = async (data) => apiClient.post('/auth/google', {
  access_token: data.accessToken,
});

export const loginFacebook = async (data) => apiClient.post('/auth/facebook', {
  access_token: data.accessToken,
});

export const logout = async () => apiClient.post('/auth/logout');
