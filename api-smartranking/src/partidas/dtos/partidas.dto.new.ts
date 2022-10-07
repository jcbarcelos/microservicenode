import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Jogadores } from 'src/jogadores/interfaces/jogadores.interface';

export class PartidasDtoNew {
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
