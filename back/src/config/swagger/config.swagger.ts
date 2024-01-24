import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Cine Rec')
  .setDescription('Projeto de faculdade para estudos')
  .setVersion('0.0.1')
  .addTag('movies')
  .build();
