import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PratidasModule } from './partidas/pratidas.module';

require('dotenv').config();

@Module({
  imports: [
    JogadoresModule,
    CategoriasModule,
    PratidasModule,
    MongooseModule.forRoot(process.env.MONGODB),
  ],
})
export class AppModule {}
