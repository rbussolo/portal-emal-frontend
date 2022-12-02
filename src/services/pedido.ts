
export interface Pedido {
  PEDNUM: number;
  PEDDATA: Date;
  CLICOD: number;
  CLICNPJCPF: string;
  CLINOME: string;
  PEDSIT: number;
  UNIDADE: string;
  EMPCOD: number;
  EMPSIGLA: string;
  FILCOD: number;
  FILIAL: string;
  ESTQCOD: number;
  ESTQNOME: string;
  IPEDNUM: number;
  IPEDQUANT: number;
  IPEDPESOTOT: number;
  IPEDUNIT: number;
  IPEDQUANTDESP: number;
  IPEDQUANTCANC: number;
  PEDPESOTOT: number;
  PEDTOTALBRUTO: number;
}

export interface ListPedidos {
  pedidos?: Pedido[];
  count: number;
  countPerPage: number;
}

export interface FiltersPedidos {
  page?: number;
  amount?: number;
  pedDataInicial?: string;
  pedDataFinal?: string;
  pedCli?: number;
  pedNum?: number;
  pedEmp?: number;
  pedFil?: number;
  estqCod?: number;
}

export const pedidoSituacaoEnum = ["Aprovado", "Cancelado", "Pendente", "Custo OK", "Reprovado"];
