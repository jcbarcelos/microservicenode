import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Jogadores } from 'src/jogadores/interfaces/jogadores.interface';

export class PartidasDtoUpdate {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  _id: string;

  @IsString()
  @IsNotEmpty()
  def: string;

  @IsArray()
  @ArrayMinSize(1)
  resultados: Array<any>;

  @IsArray()
  @ArrayMinSize(1)
  jogadores: Array<Jogadores>;
}
