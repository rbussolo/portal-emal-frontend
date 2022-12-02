import jwt_decode from 'jwt-decode';
import { AccessTokenDecoded, IRequestError, IRequestLogin, IUser } from './../contexts/AuthProvider/types';
import axios, { AxiosError } from 'axios';
import { getUserLocalStorage, setUserLocalStorage } from '../contexts/AuthProvider/util';

const BASE_URL = "http://localhost:3333/api/";

interface RequestQueue {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError<unknown, any>) => void
}

let isRefreshing = false;
let failedRequestsQueue: RequestQueue[] = [];

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  async (config) => {
    const user = getUserLocalStorage();
    
    if (user?.access_token) {
      config.headers!['Authorization'] = `Bearer ${user?.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const errorResponse = error.response.data as IRequestError;
    
    // Vamos trabalhar apenas com erros referente ao access token
    if (errorResponse.code === 'access_token' && errorResponse.message === 'TokenExpiredError') {
      const originalConfig = error.config!;

      if(!isRefreshing) {
        isRefreshing = true;

        const user = getUserLocalStorage();

        api.post('auth/refresh', { 
          token: user?.refresh_token 
        }).then(response => {
          const result = response.data as IRequestLogin;
          const jwt_access = jwt_decode(result.access_token) as AccessTokenDecoded;

          const payload: IUser = {
            user: jwt_access.user,
            access_token: result.access_token,
            refresh_token: result.refresh_token
          }

          setUserLocalStorage(payload);
          
          failedRequestsQueue.forEach(request => request.onSuccess(result.access_token));
          failedRequestsQueue = [];
        }).catch(err => {
          failedRequestsQueue.forEach(request => request.onFailure(err));
          failedRequestsQueue = [];
        }).finally(() => {
          isRefreshing = false;
        });
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers = {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }

            resolve(api(originalConfig));
          },
          onFailure: (err: AxiosError) => {
            reject(err);
          }
        });
      });
    } else {
      logout();
    }
  }
);

function logout() {
  setUserLocalStorage(null);
  (window as Window).location = '/login';
}
