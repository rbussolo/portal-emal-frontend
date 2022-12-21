

export interface Cliente {
  CLICOD?: number;
  CLINOME?: string;
  CLICNPJCPF?: string;
  CLIEMAIL?: string;
  CLIENDERECO?: string;
  CLIENDERECONUM?: number;
  CLICOBCEP?: string;
  CLICOBCIDADE?: Number;
  CLIENDERECOCOMP?: string;
  CLIBAIRRO?: string;
  CIDADE?: {
    CIDCOD: number;
    CIDNOME: string;
  }
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
  CLIEMAIL: "",
  CLIENDERECO: "",
  CLIENDERECONUM: 0,
  CLICOBCEP: "",
  CLICOBCIDADE: 0,
  CLIENDERECOCOMP: "",
  CLIBAIRRO: "",
  CIDADE: {
    CIDCOD: 0,
    CIDNOME: ""
  }
}