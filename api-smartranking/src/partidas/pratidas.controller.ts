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
import { IPartidas } from './interface/partidas.interface';
import { PratidasService } from './pratidas.service';
import { PartidasDtoNew } from './dtos/partidas.dto.new';
import { IMessage } from 'src/common/message/message';
import { PartidasDtoUpdate } from './dtos/partidas.dto.update';

@Controller(`${process.env.HOST_API_V1}/partidas`)
export class PratidasController {
  constructor(private readonly partidasService: PratidasService) {}

  @Get()
  async getAllPartidas(): Promise<IPartidas[]> {
    return await this.partidasService.getAllPartidas();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async criarPartidas(
    @Body() partidasDtoNew: PartidasDtoNew,
  ): Promise<IPartidas> {
    return await this.partidasService.criarPartidas(partidasDtoNew);
  }

  @Get('/:partidas')
  async consultaPartidas(
    @Param('partidas') partidas: string,
  ): Promise<IPartidas> {
    return await this.partidasService.consultaTodasPartidas(partidas);
  }

  @Put('/:partidas')
  @UsePipes(ValidationPipe)
  async editarPartidas(
    @Body() atualizarPartidasDto: PartidasDtoUpdate,
    @Param('partidas') partidas: string,
  ): Promise<IMessage> {
    return await this.partidasService.editarPartidas(
      atualizarPartidasDto,
      partidas,
    );
  }
  @Post('/:partidas/jogadores/:idJogador')
  @UsePipes(ValidationPipe)
  async editarPartidasJogador(@Param() params: string[]): Promise<IMessage> {
    return await this.partidasService.editarPartidasJogador(params);
  }

  @Delete('/:_id')
  async deletePartidas(@Param('_id') _id: string): Promise<void> {
    
    this.partidasService.deletePartidas(_id);
  }
}
    