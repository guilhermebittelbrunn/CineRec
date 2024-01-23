import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const logger = new Logger('bootstrap execution server', { timestamp: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
  logger.log(`Server running at port:${port}`);
}
bootstrap();
