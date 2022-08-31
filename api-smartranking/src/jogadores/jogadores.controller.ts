import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogadorDto';
import { JogadoresService } from './jogadores.service';
import { Jogadores } from './interfaces/jogadores.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
  private readonly logger = new Logger(JogadoresController.name);
  constructor(private readonly jogadoresService: JogadoresService) {}
  @Post()
  async criarAtualizarJogadores(@Body() criarJogadorDto: CriarJogadorDto) {
    const { _id, email, telefoneCelular, name } = criarJogadorDto;

    return this.jogadoresService.criarAtualizarJogador({
      _id,
      email,
      telefoneCelular,
      name,
    });
  }

  @Get()
  async consultaJogador(
    @Query('email') email: string,
  ): Promise<Jogadores[] | Jogadores> {
    this.logger.log(`email search: ${JSON.stringify(email)}`);
    if (email) return await this.jogadoresService.consultaJogador(email);
    return this.jogadoresService.getCriarJogadoresAll();
  }

  @Delete()
  async deleteJogador(@Query('email') email: string): Promise<void> {
    this.logger.log(`email delete: ${JSON.stringify(email)}`);
    this.jogadoresService.deleteJogador(email);
  }
}
