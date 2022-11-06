import { AxiosError } from "axios";
import { Api } from "../../services/api";
import { IRequestError, IRequestLogin, IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserLocalStorage(): IUser | null {
  const json = localStorage.getItem('user');

  if(!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

const LoginRequest = async (email: string, password: string): Promise<IRequestError | IRequestLogin> => {
  try {
    const request = await Api.post('auth/sign', { email, password });

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

const RefreshToken = async (refresh_token: string): Promise<IRequestError | IRequestLogin> => {
  try {
    const request = await Api.post('auth/refresh', undefined, { headers: { "Authorization": `Bearer ${refresh_token}`}});

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

export { LoginRequest, RefreshToken };