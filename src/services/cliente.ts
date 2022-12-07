

export interface Cliente {
  CLICOD?: number;
  CLINOME?: string;
  CLICNPJCPF?: string;
  CLIEMAIL?: string;
}

export interface ListClientes {
  clients?: Cliente[];
  showResults: boolean;
  count: number;
  countPerPage: number;
}

export interface FiltersClientes {
  page?: number;
  amount?: number;
  cod?: number;
  name?: string;
  cpfCnpj?: string;
}

export const EmptyCliente: Cliente = {
  CLICOD: 0,
  CLINOME: "",
  CLICNPJCPF: "",
  CLIEMAIL: ""
}