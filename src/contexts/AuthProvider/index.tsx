import { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { IAuthProvider, IContext, IUser, IRequestError, IRequestLogin, AccessTokenDecoded } from './types';
import { getUserLocalStorage, LoginRequest, RefreshToken, setUserLocalStorage } from './util';

const AuthContext = createContext<IContext>({} as IContext);

const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

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

      setUser(payload);
      setUserLocalStorage(payload);
    }

    return response;
  }

  async function refreshToken(): Promise<IRequestError | IRequestLogin> {
    const user = getUserLocalStorage();

    if(!user?.refresh_token) {
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

      setUser(payload);
      setUserLocalStorage(payload);
    } else {
      setUser(null);
      setUserLocalStorage(null);
    }

    return response;
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout, refreshToken }}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };