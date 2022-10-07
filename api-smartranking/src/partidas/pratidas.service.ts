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
import { IMessage, Messagefunction } from 'src/common/message/message';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { IPartidas } from './interface/partidas.interface';
import { PartidasDtoUpdate } from './dtos/partidas.dto.update';
import { PartidasDtoNew } from './dtos/partidas.dto.new';

@Injectable()
export class PratidasService {
  constructor(
    @InjectModel('Partidas')
    private readonly partidasModel: Model<IPartidas>,
    private readonly jogadoresService: JogadoresService,
  ) {}
  private readonly logger = new Logger(PratidasService.name);

  async getAllPartidas(): Promise<IPartidas[]> {
    this.logger.log(`Lista de  Partidas`);
    return await this.partidasModel.find().exec();
  }

  async criarPartidas(partidasDotNew: PartidasDtoNew): Promise<IPartidas> {
    const { def, resultados, jogadores } = partidasDotNew;
    const partidasEncontrada = await this.FindOnePartidas(def);
    this.logger.log(
      `Criar partidas dto: ${JSON.stringify(partidasEncontrada)}}`,
    );
    this.logger.log(
      `Criar partidas partidasDotNew: ${JSON.stringify(resultados)}}`,
    );

    if (partidasEncontrada)
      throw new NotFoundException(`Partidas  ${def} já existe  `);
    const partidasCriadas = new this.partidasModel({
      def,
      resultados,
      jogadores,
    });
    return await partidasCriadas.save();
  }

  async consultaTodasPartidas(partidas: string): Promise<IPartidas> {
    const partidasEncontrada = await this.FindOnePartidas(partidas);
    this.logger.log(`Consulta partidas: ${JSON.stringify(partidas)}}`);
    if (!partidasEncontrada)
      throw new NotFoundException(`partidas não localizada!  `);
    return partidasEncontrada;
  }

  async editarPartidas(
    @Body() atualizarPartidasDto: PartidasDtoUpdate,
    @Param('partidas') partidasid: string,
  ): Promise<IMessage> {
    const partidasEncontrada = await this.partidasModel
      .findById({ _id: partidasid })
      .exec();

    this.logger.log(`Editar partidas: ${JSON.stringify(partidasEncontrada)}`);
    if (!partidasEncontrada)
      throw new NotFoundException(`Partidas não localizada!  `);

    await this.partidasModel
      .findOneAndUpdate({ _id: partidasid }, { $set: atualizarPartidasDto })
      .exec();

    const categoria = atualizarPartidasDto['description'];

    return Messagefunction({
      type: 'Success',
      message: `Atualizado com sucesso a categoria ${categoria}`,
    });
  }

  async editarPartidasJogador(params: string[]): Promise<IMessage> {
    const def = params['def'];
    const idJogador = params['idJogador'];
    const partidasEncontrada = await this.FindOnePartidas(def);
    if (!partidasEncontrada)
      throw new NotFoundException(`Categoria não localizada!`);

    const validarExisteJogadorPartidas = await this.partidasModel
      .find({ def })
      .where('jogadores')
      .in(idJogador)
      .exec();

    this.logger.log(
      `Editar partidas jogador: ${JSON.stringify(
        validarExisteJogadorPartidas,
      )}`,
    );

    if (validarExisteJogadorPartidas.length > 0) {
      throw new BadGatewayException(
        `Jogador já cadastrada na partidas ${idJogador}!`,
      );
    }

    const validarJogarExistente = await this.jogadoresService.consultaJogadorId(
      idJogador,
    );

    if (!validarJogarExistente)
      throw new NotFoundException(`Jogador não cadastrada!`);

    partidasEncontrada.jogadores.push(idJogador);

    this.logger.log(
      `add categoria jogador: ${JSON.stringify(partidasEncontrada)}`,
    );
    await this.partidasModel
      .findOneAndUpdate({ def }, { $set: partidasEncontrada })
      .exec();

    return Messagefunction({
      type: 'success',
      message: `Cadastrado com sucesso o jogador na partidas ${def}`,
    });
  }

  async deletePartidas(_id: string): Promise<any> {
    this.logger.log(`Deleting ${JSON.stringify(_id)}`);
    return await this.partidasModel.deleteOne({ _id }).exec();
  }

  async FindOnePartidas(def: string) {
    const partidasEncontrada = await this.partidasModel.findOne({ def }).exec();

    return partidasEncontrada;
  }
}
