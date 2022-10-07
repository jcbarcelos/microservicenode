
import { Model } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Jogadores } from 'src/jogadores/interfaces/jogadores.interface';

@Injectable()
export class JogadorValidationEmailPipe {
  constructor(
    @InjectModel('Jogadores') private readonly jogadorModel: Model<Jogadores>,
  ) {}
  private readonly logger = new Logger(JogadorValidationEmailPipe.name);

  async validateEmailExiste(email: string): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    this.logger.debug(jogadorEncontrado);
    if (jogadorEncontrado)
      return JSON.stringify(`Jogador com e-mail  ${email} não encontrado `);

    return jogadorEncontrado;
  }
}
