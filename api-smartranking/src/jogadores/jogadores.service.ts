import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogadorDto';
import { Jogadores } from './interfaces/jogadores.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private jogadores: Jogadores[] = [];

  constructor(
    @InjectModel('Jogadores') private readonly jogadorModel: Model<Jogadores>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJodadorDto: CriarJogadorDto) {
    const { email } = criarJodadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (!jogadorEncontrado) {
      return await this.criarJogador(criarJodadorDto);
    }
    return await this.atualizarJogador(criarJodadorDto);
  }

  private criarJogador(criarJodadorDto: CriarJogadorDto): Promise<Jogadores> {
    const jogadorCriar = new this.jogadorModel(criarJodadorDto);
    this.logger.log(`Criar Jogador dto: ${JSON.stringify(jogadorCriar)}`);
    return jogadorCriar.save();
  }

  private async atualizarJogador(
    criarJodadorDto: CriarJogadorDto,
  ): Promise<Jogadores> {
    this.logger.log(`Atualizar Jogador dto: ${JSON.stringify(criarJodadorDto)}`);
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJodadorDto.email },
        { $set: criarJodadorDto },
      )
      .exec();
  }

  async deleteJogador(email: string): Promise<Jogadores> {
    this.logger.log(`Deleting ${JSON.stringify(email)}`);
    return await this.jogadorModel.remove({ email }).exec();
  }

  async getJogadoresAll(): Promise<Jogadores[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultaJogador(email: string): Promise<Jogadores> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado)
      throw new NotFoundException(
        `Jogador com e-mail  ${email} não encontrado  `,
      );
    return jogadorEncontrado;
  }
}
