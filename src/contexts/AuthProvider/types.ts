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
}

export interface IAuthProvider {
  children: JSX.Element;
}

export interface IRequestError {
  status?: number;
  code?: string;
  message: string;
  messages?: string[];
  additionalInfo?: any;
}

export interface IRequestSuccess {
  success: boolean;
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