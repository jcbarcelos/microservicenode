import { Document } from 'mongoose';

export interface Jogadores extends Document {
  readonly _id: string;
  readonly telefoneCelular: string;
  readonly email: string;
  name: string;
  urlFotoJogador: string;
  ranking: string;
  posicaoRanking: Number;
}
