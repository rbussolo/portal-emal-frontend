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
  async (config) => {
    const user = getUserLocalStorage();
    
    if (user?.access_token && config.url !== 'auth/refresh') {
      config.headers!['Authorization'] = `Bearer ${user?.access_token}`;
    }

    console.log(config);

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
    console.log(error);
    
    const originalConfig = error.config;
    
    if (error.response) {
      if (error.response.status === 401 && originalConfig.url !== "auth/refresh" && !originalConfig._retry) {
        originalConfig._retry = true;
        
        const result = await generateAccessToken();
        
        if ('message' in result) {
          return Promise.reject(result.message);
        }

        originalConfig.headers = {
          ...originalConfig.headers,
          authorization: `Bearer ${result.access_token}`,
        };

        return Api(originalConfig);
      }
    }

    return Promise.reject(error);
  }
);
