import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriaDtoNew } from './dtos/categoria.dto.new';
import { Categorias } from './categorias.interface';
import { CategoriasService } from './categorias.service';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  async listaCAtegorias(): Promise<Categorias> {
    return await this.categoriasService.listaCategorias();
  }
  @Post()
  async criarCategorias(
    @Body() categoriaDtoNew: CategoriaDtoNew,
  ): Promise<Categorias> {
    return await this.categoriasService.criarCategoria(categoriaDtoNew);
  }
}
