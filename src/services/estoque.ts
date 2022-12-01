
export interface Estoque {
  ESTQCOD?: string;
  ESTQNOMECOMP?: string;
  ESTQNCM?: string;
}

export interface ListEstoques {
  estoques?: Estoque[];
  showResults: boolean;
  count: number;
  countPerPage: number;
}

export interface FiltersEstoques {
  page?: number;
  amount?: number;
  cod?: string;
  name?: string;
}

export const EmptyEstoque: Estoque = {
  ESTQCOD: "", 
  ESTQNCM: "", 
  ESTQNOMECOMP: ""
}
