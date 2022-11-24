import { IRequestError, IRequestSuccess } from "../contexts/AuthProvider/types";
import { Api } from "./api";

export interface FiltersUsers {
  page?: number;
  name?: string;
  email?: string;
  type?: string;
}

export interface UserType {
  client: string;
  seller: string;
  adm: string;
}

export const userTypeEnum: UserType = {
  client: "Cliente",
  seller: "Vendedor",
  adm: "Administrador"
}

export interface User {
  id?: number;
  cpf_cnpj: string;
  name: string;
  email: string;
  type: keyof UserType;
  cellphone?: string;
  password?: string;
}

export interface ListUsers {
  users?: User[];
  count: number;
  countPerPage: number;
}

async function fetchUsers({ page, name, email, type }: FiltersUsers, logout: () => void): Promise<ListUsers | undefined> {
  try {
    const response = await Api.get("/users", { params: { page, name, email, type } });
    
    return response.data as ListUsers;
  } catch(error) {
    logout();
  }
}

async function fetchUserById(id: number, logout: () => void): Promise<User | undefined | IRequestError>{
  try {
    const response = await Api.get("/users/" + id);

    if (response.status >= 300) {
      return response.data as IRequestError;
    }

    return response.data as User;
  } catch (error) {
    logout();
  }
}

async function saveUser({ id, cpf_cnpj, name, email, type, cellphone, password }: User, logout: () => void): Promise<User | undefined | IRequestError> {
  if (id) {
    return updateUser({ id, cpf_cnpj, name, email, type, cellphone }, logout);
  }

  return newUser({ cpf_cnpj, name, email, type, cellphone, password }, logout);
}

async function newUser({ cpf_cnpj, name, email, type, cellphone, password }: User, logout: () => void): Promise<User | undefined | IRequestError> {
  try {
    const response = await Api.post("/users", { cpf_cnpj, name, email, type, cellphone, password });

    if (response.status >= 300) {
      return response.data as IRequestError;
    }

    return response.data as User;
  } catch (error) {
    logout();
  }
}

async function updateUser({ id, cpf_cnpj, name, email, type, cellphone }: User, logout: () => void): Promise<User | undefined | IRequestError> {
  try {
    const response = await Api.put("/users/" + id, { cpf_cnpj, name, email, type, cellphone });

    if (response.status >= 300) {
      return response.data as IRequestError;
    }

    return response.data as User;
  } catch (error) {
    logout();
  }
}

async function deleteUser(id: number, logout: () => void): Promise<IRequestError | IRequestSuccess | undefined> {
  try {
    const response = await Api.delete("/users/" + id);

    if (response.status >= 300) {
      return response.data as IRequestError;
    }

    return response.data as IRequestSuccess;
  } catch (error) {
    logout();
  }
}

export { fetchUsers, fetchUserById, saveUser, deleteUser }