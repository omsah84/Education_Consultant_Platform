// lib/useApi.ts
import axios from 'axios';
import { useAuth } from './AuthContext';

export const useApi = () => {
  const { accessToken, refreshAccessToken, logout } = useAuth();

  const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await refreshAccessToken();

        if (newToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest); // use the same instance
        } else {
          logout(); // logout on failure
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
