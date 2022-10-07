import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExecptionFilter } from './common/filters/http-exception.filter';
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExecptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
