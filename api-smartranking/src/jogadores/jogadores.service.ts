import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CriarJogadorDto } from './dtos/criarJogadorDto';
import { Jogadores } from './interfaces/jogadores.interface';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class JogadoresService {
  [x: string]: any;
  private jogadores: Jogadores[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJodadorDto: CriarJogadorDto) {
    this.logger.log(`Criar Jogador dto: ${criarJodadorDto}`);
    await this.criarJogador(criarJodadorDto);
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

  async getCriarJogadoresAll(): Promise<Jogadores[]> {
    return await this.jogadores;
  }
}
