import { AxiosError } from 'axios';
import { IRequestError } from '../contexts/AuthProvider/types';
import { api } from "./api";

interface PostRequestProps {
  method: string;
  url: string;
  data?: any;
}

const request = async ({ method, url, data }: PostRequestProps): Promise<IRequestError | any>=> {
  try {
    const request = await api.request({
      method: method,
      url: url,
      data: data
    });

    return request.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorRequest = error.response?.data as IRequestError;

      if (errorRequest) {
        return errorRequest;
      }
    }

    return { message: "Ocorreu um erro de comunicação ao servidor." };
  }
}

export { request }