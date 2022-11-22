/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo } from 'react';
import jwt_decode from 'jwt-decode';
import { IAuthProvider, IContext, IUser, IRequestError, IRequestLogin, AccessTokenDecoded } from './types';
import { getUserLocalStorage, LoginRequest, RefreshToken, setUserLocalStorage } from './util';
import { useNavigate } from 'react-router-dom';

export async function generateAccessToken(): Promise<IRequestError | IRequestLogin> {
  const user = getUserLocalStorage();

  if (!user?.refresh_token) {
    return { message: "Refresh token is necessary!" }
  }

  const response = await RefreshToken(user.refresh_token);

  if ('access_token' in response) {
    const result = jwt_decode(response.access_token) as AccessTokenDecoded;

    const payload: IUser = {
      user: result.user,
      access_token: response.access_token,
      refresh_token: response.refresh_token
    }

    setUserLocalStorage(payload);
  } else {
    setUserLocalStorage(null);
  }

  return response;
}

const AuthContext = createContext<IContext>({} as IContext);

const AuthProvider = ({ children }: IAuthProvider) => {
  const navigate = useNavigate();

  async function authenticate(email: string, password: string): Promise<IRequestError | IRequestLogin> {
    if (email === "") 
      return { message: "É necessário informar o E-mail do Usuário!" };

    if (password === "")
      return { message: "É necessário informar a Senha do Usuário!" };

    const response = await LoginRequest(email, password);
    
    if ('access_token' in response) {
      const result = jwt_decode(response.access_token) as AccessTokenDecoded;

      const payload: IUser = {
        user: result.user,
        access_token: response.access_token,
        refresh_token: response.refresh_token
      }

      setUserLocalStorage(payload);
    }

    return response;
  }

  function logout() {
    setUserLocalStorage(null);
    navigate("/login");
  }

  function getCurrentUser() {
    return getUserLocalStorage();
  }

  const value = useMemo(
    () => ({ authenticate, logout, generateAccessToken, getCurrentUser }),
    []
  );

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };