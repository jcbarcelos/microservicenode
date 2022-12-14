import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Eventos } from '../interface/eventos.interface';

export class CategoriaDtoUpdate {

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Eventos>;
}
