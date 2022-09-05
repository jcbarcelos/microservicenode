import {Document} from 'mongoose'

export interface Jogadores extends Document{
  readonly _id: string;
  readonly telefoneCelular: string;
  readonly email: string;
  name: string;
  urlFotoJogador: string;
  ranking: string;
  posicaoRanking: Number;
  // desempenho: Desempenho;
}

// interface Desempenho {
//   categoria: string;
//   vitorias: number;
//   derrotas: number;
//   pontos: number;
// }
