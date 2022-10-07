import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriaDtoNew } from './dtos/categoria.dto.new';
import { CategoriasService } from './categorias.service';
import { CategoriaDtoUpdate } from './dtos/categoria.dto.update';
import { Categorias } from './interface/categoria.interface';
import { IMessage } from 'src/common/message/message';


@Controller(`${process.env.HOST_API_V1}/categorias`)
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}
  private readonly logger = new Logger(CategoriasService.name);
  @Get()
  async listaCategorias(): Promise<Categorias[]> {
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

  @Put('/:categoria')
  @UsePipes(ValidationPipe)
  async editarCategoria(
    @Body() atualizarCategoriaDto: CategoriaDtoUpdate,
    @Param('categoria') categoria: string,
  ): Promise<IMessage> {
    return await this.categoriasService.editarCategoria(
      atualizarCategoriaDto,
      categoria,
    );
  }
  @Post('/:categoria/jogadores/:idJogador')
  @UsePipes(ValidationPipe)
  async editarCategoriaJogador(@Param() params: string[]): Promise<IMessage> {
 
    return await this.categoriasService.editarCategoriaJogador(params);
  }

  @Delete('/:_id')
  async deleteJogador(@Param('categoria') _id: string): Promise<void> {
    this.categoriasService.deleteCategoria(_id);
  }
}
