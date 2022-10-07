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
import { ValidationParamentrosPipe } from '../common/pipes/validacao-paramentros-pipe';
require('dotenv').config();
@Controller('api/v1/jogadores')
export class JogadoresController {
  private readonly logger = new Logger(JogadoresController.name);
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogadores(
    @Body(ValidationParamentrosPipe) criarJogadorDto: CriarJogadorDto,
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
    @Param('_id', ValidationParamentrosPipe) _id: string,
    @Body(ValidationParamentrosPipe) criarJogadorDto: CriarJogadorDto,
  ) {
    return this.jogadoresService.atualizarJogador(_id, criarJogadorDto);
  }

  @Get()
  async consultaJogador(): Promise<Jogadores[] | Jogadores> {
    return this.jogadoresService.getJogadoresAll();
  }
  @Get('/:_id')
  async consultaJogadorId(
    @Param('_id', ValidationParamentrosPipe) _id: string,
  ): Promise<Jogadores> {
    this.logger.log(`_id search: ${JSON.stringify(_id)}`);
    return await this.jogadoresService.consultaJogadorId(_id);
  }

  @Delete('/:_id')
  async deleteJogador(
    @Param('_id', ValidationParamentrosPipe) _id: string,
  ): Promise<void> {
    this.logger.log(`_id delete: ${JSON.stringify(_id)}`);
    this.jogadoresService.deleteJogador(_id);
  }
}
