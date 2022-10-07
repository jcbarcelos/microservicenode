import {
  BadGatewayException,
  Body,
  Injectable,
  Logger,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoriaDtoNew } from './dtos/categoria.dto.new';
import { CategoriaDtoUpdate } from './dtos/categoria.dto.update';
import { Categorias } from './interface/categoria.interface';
import { JogadoresService } from '../jogadores/jogadores.service';
import { IMessage, Messagefunction } from 'src/common/message/message';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categorias')
    private readonly categoriaModel: Model<Categorias>,
    private readonly jogadoresService: JogadoresService,
  ) {}
  private readonly logger = new Logger(CategoriasService.name);

  async criarCategoria(categoriaDtoNew: CategoriaDtoNew): Promise<Categorias> {
    const { categoria } = categoriaDtoNew;
    const categoriaEncontrada = await this.FindOneCategoria(categoria);
    this.logger.log(`Criar Categoria dto: ${JSON.stringify(categoriaDtoNew)}}`);

    if (categoriaEncontrada)
      throw new NotFoundException(`Categoria  ${categoria} já existe  `);
    const categoriaCriadas = new this.categoriaModel(categoriaDtoNew);
    return await categoriaCriadas.save();
  }

  async listaCategorias(): Promise<Categorias[]> {
    this.logger.log(`Lista de  Categoria`);
    return await this.categoriaModel.find().exec();
  }

  async consultaTodasCategorias(categoria: string): Promise<Categorias> {
    const categoriaEncontrada = await this.FindOneCategoria(categoria);
    this.logger.log(`Consulta Categoria: ${JSON.stringify(categoria)}}`);
    if (!categoriaEncontrada)
      throw new NotFoundException(`Categoria não localizada!  `);
    return categoriaEncontrada;
  }

  async editarCategoria(
    @Body() atualizarCategoriaDto: CategoriaDtoUpdate,
    @Param('categoria') categoriaid: string,
  ): Promise<IMessage> {
    const categoriaEncontrada = await this.categoriaModel
      .findById({ _id: categoriaid })
      .exec();

    this.logger.log(`Editar categoria: ${JSON.stringify(categoriaEncontrada)}`);
    if (!categoriaEncontrada)
      throw new NotFoundException(`Categoria não localizada!  `);

    await this.categoriaModel
      .findOneAndUpdate({ _id: categoriaid }, { $set: atualizarCategoriaDto })
      .exec();

    const categoria = atualizarCategoriaDto['description'];
    return Messagefunction({
      type: 'Success',
      message: `Atualizado com sucesso a categoria ${categoria}`,
    });
  }

  async editarCategoriaJogador(params: string[]): Promise<IMessage> {
    const categoria = params['categoria'];
    const idJogador = params['idJogador'];
    const categoriaEncontrada = await this.FindOneCategoria(categoria);
    if (!categoriaEncontrada)
      throw new NotFoundException(`Categoria não localizada!`);

    const validarExisteJogadorCategoria = await this.categoriaModel
      .find({ categoria })
      .where('jogadores')
      .in(idJogador)
      .exec();

    this.logger.log(
      `Editar categoria jogador: ${JSON.stringify(
        validarExisteJogadorCategoria,
      )}`,
    );

    if (validarExisteJogadorCategoria.length > 0) {
      throw new BadGatewayException(
        `Jogador já cadastrada na categoria ${categoria}!`,
      );
    }

    const validarJogarExistente = await this.jogadoresService.consultaJogadorId(
      idJogador,
    );

    if (!validarJogarExistente)
      throw new NotFoundException(`Jogador não cadastrada!`);

    categoriaEncontrada.jogadores.push(idJogador);

    this.logger.log(
      `add categoria jogador: ${JSON.stringify(categoriaEncontrada)}`,
    );
    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: categoriaEncontrada })
      .exec();

    return Messagefunction({
      type: 'success',
      message: `Cadastrado com sucesso o jogador na categoria ${categoria}`,
    });
  }

  async deleteCategoria(_id: string): Promise<any> {
    this.logger.log(`Deleting ${JSON.stringify(_id)}`);
    return await this.categoriaModel.deleteOne({ _id }).exec();
  }

  async FindOneCategoria(categoria: string) {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    return categoriaEncontrada;
  }
}
