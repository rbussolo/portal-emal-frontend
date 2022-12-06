
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
  type?: keyof UserType;
  cellphone?: string;
  password?: string;
}

export interface ListUsers {
  users?: User[];
  count: number;
  countPerPage: number;
}

export interface UserClientState {
  required: string;
  aproved: string;
  dissaproved: string;
}

export const userClientStateEnum: UserClientState = {
  required: "Requerido",
  aproved: "Aprovado",
  dissaproved: "Desaprovado"
}

export interface UserClient {
  id: number;
  user_id: number;
  client_id: number;
  client_name: string;
  client_cpf_cnpj: string;
  state: keyof UserClientState;
}

export const EmptyUser: User = {
  cpf_cnpj: "",
  name: "",
  email: "",
}
