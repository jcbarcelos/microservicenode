import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Jogadores } from 'src/jogadores/interfaces/jogadores.interface';
import { Eventos } from '../interface/categoria.interface';

export class CategoriaDtoUpdate {
  @IsNotEmpty()
  @IsString()
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  readonly categoria: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @ArrayMinSize(1)
  jogadores: Array<Jogadores>;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Eventos>;
}
