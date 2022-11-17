import axios from 'axios';
import { getUserLocalStorage } from '../contexts/AuthProvider/util';
import { generateAccessToken } from '../contexts/AuthProvider';

const BASE_URL = "http://localhost:3333/api/";

export const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

Api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();

    if (user?.access_token && config.url !== 'auth/refresh') {
      config.headers!['Authorization'] = `Bearer ${user?.access_token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    
    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        
        const result = await generateAccessToken();
        
        if ('message' in result) {
          return Promise.reject(result.message);
        }

        Api.defaults.headers['Authorization'] = `Bearer ${result.access_token}`;

        return Api(originalConfig);
      }
    }

    return Promise.reject(error);
  }
);
