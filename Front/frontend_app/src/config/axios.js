import axios from 'axios';
import config from './app.config';

const apiClient = axios.create(
  {
    baseURL: config.apiURL,
    withCredentials: true,
    responseType: 'json',
  },
);

/* eslint no-param-reassign: "error" */
apiClient.interceptors.request.use((conf) => {
  conf.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return conf;
});

apiClient.interceptors.response.use((conf) => conf, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config.isRetry) {
    originalRequest.isRetry = true;
    try {
      const response = await axios.get(`${config.apiURL}/auth/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      return apiClient.request(originalRequest);
    } catch (e) {
      console.log('НЕ АВТОРИЗОВАН');
    }
  }
  throw error;
});

export default apiClient;
