import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogadorDto';
import { JogadoresService } from './jogadores.service';
import { Jogadores } from './interfaces/jogadores.interface';
import { JogadorValidationParamentrosPipe } from './pipes/jogdores-validacao-paramentros-pipe';
require('dotenv').config();
@Controller('api/v1/jogadores')
export class JogadoresController {
  private readonly logger = new Logger(JogadoresController.name);
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarAtualizarJogadores(@Body() criarJogadorDto: CriarJogadorDto) {
    const { email, telefoneCelular, name } = criarJogadorDto;

    return this.jogadoresService.criarAtualizarJogador({
      email,
      telefoneCelular,
      name,
    });
  }

  @Get()
  async consultaJogador(
    @Query('email', JogadorValidationParamentrosPipe) email: string,
  ): Promise<Jogadores[] | Jogadores> {
    if (email) return await this.jogadoresService.consultaJogador(email);
    this.logger.log(`email search: ${JSON.stringify(email)}`);
    return this.jogadoresService.getJogadoresAll();
  }
  @Get('/:_id')
  async consultaJogadorId(@Param('_id') _id: string): Promise<Jogadores> {
    this.logger.log(`_id search: ${JSON.stringify(_id)}`);
    return await this.jogadoresService.consultaJogadorId(_id);
  }

  @Delete()
  async deleteJogador(
    @Query('email', JogadorValidationParamentrosPipe) email: string,
  ): Promise<void> {
    this.logger.log(`email delete: ${JSON.stringify(email)}`);
    this.jogadoresService.deleteJogador(email);
  }
}
