import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
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
  async criarJogadores(
    @Body(JogadorValidationParamentrosPipe) criarJogadorDto: CriarJogadorDto,
  ) {
    const { email, telefoneCelular, name } = criarJogadorDto;
    return await this.jogadoresService.criarJogador({
      email,
      telefoneCelular,
      name,
    });
  }
  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogadores(
    @Param('_id', JogadorValidationParamentrosPipe) _id: string,
    @Body(JogadorValidationParamentrosPipe) criarJogadorDto: CriarJogadorDto,
  ) {
    return this.jogadoresService.atualizarJogador(_id, criarJogadorDto);
  }

  @Get()
  async consultaJogador(): Promise<Jogadores[] | Jogadores> {
    return this.jogadoresService.getJogadoresAll();
  }
  @Get('/:_id')
  async consultaJogadorId(
    @Param('_id', JogadorValidationParamentrosPipe) _id: string,
  ): Promise<Jogadores> {
    this.logger.log(`_id search: ${JSON.stringify(_id)}`);
    return await this.jogadoresService.consultaJogadorId(_id);
  }

  @Delete('/:_id')
  async deleteJogador(
    @Param('_id', JogadorValidationParamentrosPipe) _id: string,
  ): Promise<void> {
    this.logger.log(`_id delete: ${JSON.stringify(_id)}`);
    this.jogadoresService.deleteJogador(_id);
  }
}
