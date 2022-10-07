import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { CategoriaSchema } from './schema/categoria.schema';

@Module({
  controllers: [CategoriasController],
  imports: [
    MongooseModule.forFeature([
      { name: 'Categorias', schema: CategoriaSchema },
    ]),
    JogadoresModule,
  ],
  providers: [CategoriasService],
})
export class CategoriasModule {}
