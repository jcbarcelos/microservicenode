import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogadorDto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  @Post()
  async criarAtualizarJogadores(@Body() criarJogadorDto: CriarJogadorDto) {
    const { email, telefoneCelular, name } = criarJogadorDto;
    return JSON.stringify(`{
      "email": ${email},
      "telefoneCelular": ${telefoneCelular},
      "name": ${name}
    }`);
  }
}
