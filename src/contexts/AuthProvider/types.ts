export interface IUser {
  user?: {
    id: number;
    name: string;
    cpf_cnpj: string;
    email: string;
    cellphone: string;
    type: string;
  }
  access_token?: string;
  refresh_token?: string;
}

export interface IContext {
  getCurrentUser: () => IUser | null;
  authenticate: (email: string, password: string) => Promise<IRequestError | IRequestLogin>;
  logout: () => void;
  generateAccessToken: () => Promise<IRequestError | IRequestLogin>;
}

export interface IAuthProvider {
  children: JSX.Element;
}

export interface IRequestError {
  message: string;
}

export interface IRequestLogin {
  access_token: string;
  refresh_token: string;
}

export interface AccessTokenDecoded {
  exp: number;
  iat: number;
  user: {
    id: number;
    name: string;
    cpf_cnpj: string;
    email: string;
    cellphone: string;
    type: string;
  }
}