import { ArrayMinSize, IsArray,  IsNotEmpty, IsString } from 'class-validator';
import { Jogadores } from 'src/jogadores/interfaces/jogadores.interface';
import { Eventos } from '../interface/eventos.interface';

export class CategoriaDtoNew {
  @IsString()
  @IsNotEmpty()
  readonly categoria: string;

  @IsString()
  @IsNotEmpty()
  description: string;


  jogadores: Jogadores;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Eventos>;
}
