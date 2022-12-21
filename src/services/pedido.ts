
export interface Pedido {
  PEDNUM: number;
  PEDDATA: string;
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
  IPEDQUANTSALDO: number;
  PEDPESOTOT: number;
  PEDTOTALBRUTO: number;
}

export interface PedidoGroup {
  IPEDQUANT: number;
  IPEDPESOTOT: number;
  IPEDUNIT: number;
  IPEDQUANTDESP: number;
  IPEDQUANTCANC: number;
  IPEDQUANTSALDO: number;
  PEDPESOTOT: number;
  PEDTOTALBRUTO: number;
}

export const EmptyPedidoGroup: PedidoGroup = {
  IPEDQUANT: 0,
  IPEDPESOTOT: 0,
  IPEDUNIT: 0,
  IPEDQUANTDESP: 0,
  IPEDQUANTCANC: 0,
  IPEDQUANTSALDO: 0,
  PEDPESOTOT: 0,
  PEDTOTALBRUTO: 0
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
  pedNobres?: boolean;
  pedCuiaba?: boolean;
  pedAcucar?: boolean;
  pedItaipu?: boolean;
  pedCamil?: boolean;
}

export interface PedidoEstoque {
  IPEDCOD?: number;
  ESTQCOD: number;
  ESTQNOMECOMP: string;
  IPEDQUANT: number;
  IPEDPESOTOT: number;
  IPEDUNIT: number;
  IPEDQUANTDESP: number;
  IPEDQUANTCANC: number;
  IPEDQUANTSALDO: number;
}

export const pedidoSituacaoEnum = ["Aprovado", "Cancelado", "Pendente", "Custo OK", "Reprovado"];
