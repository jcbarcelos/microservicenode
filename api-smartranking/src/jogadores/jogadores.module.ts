import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './schema/jogador.schema';

@Module({
  controllers: [JogadoresController],
  imports: [
    MongooseModule.forFeature([{ name: 'Jogadores', schema: JogadorSchema }]),
  ],
  providers: [JogadoresService],
})
export class JogadoresModule {}
