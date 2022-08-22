export interface Jogadores {
  readonly _id: string;
  readonly telefoneCelular: string;
  readonly email: string;
  name: string;
  urlFotoJogador: string;
  desempenho: Desempenho;
}

interface Desempenho {
  categoria: string;
  vitorias: number;
  derrotas: number;
  pontos: number;
}
