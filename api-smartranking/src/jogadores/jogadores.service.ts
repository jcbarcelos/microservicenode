import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CriarJogadorDto } from './dtos/criarJogadorDto';
import { Jogadores } from './interfaces/jogadores.interface';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class JogadoresService {
  private jogadores: Jogadores[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJodadorDto: CriarJogadorDto) {
    const { email } = criarJodadorDto;

    const jogadorEncontrado = await this.jogadores.find(
      (jogadores) => jogadores.email === email,
    );

    if (!jogadorEncontrado) {
      return await this.criarJogador(criarJodadorDto);
    }
    return await this.atualizarJogador(criarJodadorDto, jogadorEncontrado);
  }

  private criarJogador(criarJodadorDto: CriarJogadorDto): void {
    const { name, email, telefoneCelular } = criarJodadorDto;

    const jogadores: Jogadores = {
      _id: `${uuidv4()}`,
      name,
      telefoneCelular,
      email,
      urlFotoJogador: 'www.google.com/foto123.jpg',
      desempenho: {
        categoria: 'A',
        vitorias: 10,
        derrotas: 5,
        pontos: 10,
      },
    };
    this.jogadores.push(jogadores);
    this.logger.log(`Criar Jogador dto: ${JSON.stringify(jogadores)}`);
  }

  private atualizarJogador(
    criarJodadorDto: CriarJogadorDto,
    jogadorEncontrado: Jogadores,
  ): void {
    const { name, email, telefoneCelular } = criarJodadorDto;
    jogadorEncontrado.name = name;

    this.logger.log(`Criar Jogador dto: ${JSON.stringify(jogadorEncontrado)}`);
  }

  async deleteJogador(email: string): Promise<void>{
    this.logger.log(`Deleting ${JSON.stringify(email)}`);
    const jogadorEncontrado = this.jogadores.find(
      (jogadorEncontrado) => jogadorEncontrado === jogadorEncontrado,
    );
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );

  }
  async getCriarJogadoresAll(): Promise<Jogadores[]> {
    return await this.jogadores;
  }

  async consultaJogador(email: string): Promise<Jogadores> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogadorBusca) => jogadorBusca.email === email,
    );

    if (!jogadorEncontrado)
      throw new NotFoundException(
        `Jogador com e-mail  ${email} não encontrado  `,
      );

    return jogadorEncontrado;
  }
}
