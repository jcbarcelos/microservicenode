import { Document } from 'mongoose';
import { Eventos } from './eventos.interface';
import { Jogadores } from '../../jogadores/interfaces/jogadores.interface';

export interface Categorias extends Document {
  readonly _id: string;
  readonly categoria: string;
  description: string;
  eventos: Array<Eventos>;
  jogadores?: Array<Jogadores>;
}
