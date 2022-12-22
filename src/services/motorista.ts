export interface FiltersMotorista {
  page?: number;
  MOTCPF?: string;
  MOTNOME?: string;
  CIDCOD?: number;
  ESTCOD?: number;
}

export interface Motorista {
  MOTCOD: number;
  MOTCPF: string;
  MOTNOME: string;
  MOTENDERECO: string;
  MOTBAIRRO: string;
  MOTCEP: string;
  MOTCIDADE: number;
  MOTTELEFONE: string;
  MOTCELULAR: string;
  MOTWHATSAPP: string;
  MOTCHAB: string;
  MOTCHABVENC: Date;
  MOTCHABCATEG: string;
  MOTDATANASC: Date;
  MOTPAI: string;
  MOTMAE: string;
}

export interface ListMotoristas {
  motorista?: {
    MOTCOD: number;
    MOTCPF: string;
    MOTNOME: string;
    MOTTELEFONE: string;
    MOTCELULAR: string;
    CIDCOD: number;
    CIDNOME: string;
  }[];
  count: number;
  countPerPage: number;
}
