import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorias } from './categorias.interface';
import { CategoriaDtoNew } from './dtos/categoria.dto.new';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categorias')
    private readonly categoriaModel: Model<Categorias>,
  ) {}
  private readonly logger = new Logger(CategoriasService.name);

  async criarCategoria(categoriaDtoNew: CategoriaDtoNew): Promise<Categorias> {
    const { categoria } = categoriaDtoNew;
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    this.logger.log(`Criar Categoria dto: ${JSON.stringify(categoriaDtoNew)}}`);

    if (categoriaEncontrada)
      throw new NotFoundException(`Categoria  ${categoria} já existe  `);
    const categoriaCriadas = new this.categoriaModel(categoriaDtoNew);
    return await categoriaCriadas.save();
  }

  async listaCategorias(): Promise<Categorias> {
    this.logger.log(`Lista de  Categoria`);
    return await this.categoriaModel.find().exec();
  }

  async consultaTodasCategorias(categoria: string): Promise<Categorias> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    this.logger.log(`Consulta Categoria: ${JSON.stringify(categoria)}}`);
    if (!categoriaEncontrada)
      throw new NotFoundException(`Categoria  não existe!  `);
    return categoriaEncontrada;
  }
}
