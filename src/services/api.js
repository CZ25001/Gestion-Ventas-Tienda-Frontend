import axios from 'axios';
import { env } from '../schemas/env.schema';

const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: env.VITE_AUTH_MODE === 'cookie',
});

api.interceptors.request.use((config) => {
  if (env.VITE_AUTH_MODE === 'cookie') {
    config.headers['x-use-cookie'] = 'true';
  } else {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;