
export interface Estoque {
  ESTQCOD?: number;
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
  cod?: number;
  name?: string;
}
