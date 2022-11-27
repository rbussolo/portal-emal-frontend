import { IRequestError, IRequestSuccess } from "../contexts/AuthProvider/types";
import { api } from "./api";

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
