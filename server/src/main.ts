import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configApp from '@configs/app.config';
import { configSwagger } from '@configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configApp(app)
  configSwagger(app)
  await app.listen(3000);
}
bootstrap();
