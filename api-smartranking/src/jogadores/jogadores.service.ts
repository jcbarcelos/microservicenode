import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogadorDto';
import { Jogadores } from './interfaces/jogadores.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadorValidationEmailPipe } from './pipes/jogador-validacao-email-pipe';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogadores') private readonly jogadorModel: Model<Jogadores>,
 
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criarJodadorDto: CriarJogadorDto): Promise<Jogadores> {
    const jogadorCriar = new this.jogadorModel(criarJodadorDto);
    const { email, telefoneCelular } = criarJodadorDto;
    this.logger.log(`Criar Jogador dto: ${JSON.stringify(jogadorCriar)}`);
    await this.validateEmailExiste(email);
    await this.validateTelefoneExiste(telefoneCelular);
    return jogadorCriar.save();
  }

  async atualizarJogador(
    _id: string,
    criarJodadorDto: CriarJogadorDto,
  ): Promise<void> {
    this.logger.log(
      `Atualizar Jogador dto: ${JSON.stringify(criarJodadorDto)}`,
    );
    await this.jogadorModel
      .updateOne({ _id }, { $set: criarJodadorDto })
      .exec();
  }

  async deleteJogador(_id: string): Promise<any> {
    this.logger.log(`Deleting ${JSON.stringify(_id)}`);
    return await this.jogadorModel.deleteOne({ _id }).exec();
  }

  async getJogadoresAll(): Promise<Jogadores[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultaJogador(email: string): Promise<Jogadores> {
    return await this.validateEmailExiste(email);
  }
  async consultaJogadorId(_id: string): Promise<Jogadores> {
    const jogadorEncontrado = await this.jogadorModel.findById({ _id }).exec();
    if (!jogadorEncontrado)
      throw new NotFoundException(`Jogador com _id  ${_id} não encontrado  `);
    return jogadorEncontrado;
  }

  async validateEmailExiste(email: string): Promise<Jogadores> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (jogadorEncontrado)
      throw new NotFoundException(
        `Jogador com e-mail ${email} já encontrado  `,
      );
    return jogadorEncontrado;
  }
  async validateTelefoneExiste(telefoneCelular: string): Promise<Jogadores> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ telefoneCelular }).exec();
    if (jogadorEncontrado)
      throw new NotFoundException(
        `Jogador com telefoneCelular ${telefoneCelular} já encontrado  `,
      );
    return jogadorEncontrado;
  }
}
