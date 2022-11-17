import { Api } from "./api";

interface FiltersUsers {
  page?: number;
  name?: string;
  email?: string;
  type?: string;
}

export interface User {
  id: number;
  cpf_cnpj: string;
  name: string;
  email: string;
  type: string;
}

export interface ListUsers {
  users?: User[];
  count: number;
}

async function fetchUsers({ page, name, email, type }: FiltersUsers): Promise<ListUsers> {
  try {
    const response = await Api.get("/users", { params: { page, name, email, type } });

    return response.data as ListUsers;
  } catch(error) {
    return { users: [], count: 0};
  }
}

export { fetchUsers }