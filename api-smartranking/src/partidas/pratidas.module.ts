import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { PratidasController } from './pratidas.controller';
import { PratidasService } from './pratidas.service';
import { PartidasSchema } from './schema/partidas.schema';

@Module({
  controllers: [PratidasController],
  imports: [
    MongooseModule.forFeature([{ name: 'Partidas', schema: PartidasSchema }]),
    JogadoresModule,
  ],
  providers: [PratidasService],
})
export class PratidasModule {}
