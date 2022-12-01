

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
  name?: string;
  cpfCnpj?: string;
}