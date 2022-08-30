import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogadorDto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}
  @Post()
  async criarAtualizarJogadores(@Body() criarJogadorDto: CriarJogadorDto) {
    const {_id, email, telefoneCelular, name } = criarJogadorDto;
    return this.jogadoresService.criarAtualizarJogador({
      _id,
      email,
      telefoneCelular,
      name,
    });
    
  }
}
