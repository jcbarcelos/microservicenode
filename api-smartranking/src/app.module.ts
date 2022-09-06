import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
require('dotenv').config();

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(process.env.MONGODB),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
