import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const PORT: number = 8000;
  await app.listen(PORT, () => {
    log(`app listening at http://localhost:${PORT}`);
  });
}
bootstrap();
