import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Jogadores } from 'src/jogadores/interfaces/jogadores.interface';

export class CategoriaDtoUpdateJogadores {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id_: string;

  @IsArray()
  @ArrayMinSize(1)
  jogadores: Array<Jogadores>;
}
