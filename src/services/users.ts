import { Api } from "./api";

export interface FiltersUsers {
  page?: number;
  name?: string;
  email?: string;
  type?: string;
}

interface UserType {
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
  id: number;
  cpf_cnpj: string;
  name: string;
  email: string;
  type: keyof UserType;
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

export { fetchUsers }