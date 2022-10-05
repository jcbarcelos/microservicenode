import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriaDtoNew } from './dtos/categoria.dto.new';
import { Categorias } from './categorias.interface';
import { CategoriasService } from './categorias.service';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  async listaCategorias(): Promise<Categorias> {
    return await this.categoriasService.listaCategorias();
  }
  @Post()
  @UsePipes(ValidationPipe)
  async criarCategorias(
    @Body() categoriaDtoNew: CategoriaDtoNew,
  ): Promise<Categorias> {
    return await this.categoriasService.criarCategoria(categoriaDtoNew);
  }

  @Get('/:categoria')
  async consultaCatergoria(
    @Param('categoria') categoria: string,
  ): Promise<Categorias> {
    return await this.categoriasService.consultaTodasCategorias(categoria);
  }
}
