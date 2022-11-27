/* eslint-disable react-hooks/exhaustive-deps */
import jwt_decode from 'jwt-decode';
import { createContext, useMemo } from 'react';
import { IAuthProvider, IContext, IUser, IRequestError, IRequestLogin, AccessTokenDecoded } from './types';
import { getUserLocalStorage, setUserLocalStorage } from './util';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const AuthContext = createContext<IContext>({} as IContext);

const AuthProvider = ({ children }: IAuthProvider) => {
  const navigate = useNavigate();

  async function authenticate(email: string, password: string): Promise<IRequestError | IRequestLogin> {
    if (email === "") 
      return { message: "É necessário informar o E-mail do Usuário!" };

    if (password === "")
      return { message: "É necessário informar a Senha do Usuário!" };

    return new Promise((resolve, reject) => {
      api.post('auth/sign', { 
        email, 
        password 
      }).then(response => {
        const result = response.data as IRequestLogin;
        const jwt_access = jwt_decode(result.access_token) as AccessTokenDecoded;

        const payload: IUser = {
          user: jwt_access.user,
          access_token: result.access_token,
          refresh_token: result.refresh_token
        }

        setUserLocalStorage(payload);

        resolve(result);
      }).catch(err => {
        reject(err);
      })
    });
  }

  function logout() {
    setUserLocalStorage(null);
    navigate("/login");
  }

  function getCurrentUser() {
    return getUserLocalStorage();
  }

  const value = useMemo(
    () => ({ authenticate, logout, getCurrentUser }),
    []
  );

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };