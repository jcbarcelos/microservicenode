import { Document } from 'mongoose';
import { Jogadores } from 'src/jogadores/interfaces/jogadores.interface';

export interface IPartidas extends Document {
  readonly _id: string;
  readonly def: string;
  resultados: Array<any>;
  jogadores: Array<Jogadores>;
}
