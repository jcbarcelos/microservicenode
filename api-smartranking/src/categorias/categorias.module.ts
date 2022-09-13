import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { CategoriaSchema } from './schema/categoria.schema';

@Module({
  controllers: [CategoriasController],
  imports: [
    MongooseModule.forFeature([
      { name: 'Categorias', schema: CategoriaSchema },
    ]),
  ],
  providers: [CategoriasService],
})
export class CategoriasModule {}
