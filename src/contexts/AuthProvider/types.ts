export interface IUser {
  email?: string;
  access_token?: string;
  refresh_token?: string;
}

export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<IRequestError | IRequestLogin>;
  logout: () => void;
  refreshToken: () => Promise<IRequestError | IRequestLogin>;
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