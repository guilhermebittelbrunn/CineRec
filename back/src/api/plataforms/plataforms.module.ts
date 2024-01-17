import { Module } from '@nestjs/common';
import { PlataformsController } from './plataforms.controller';
import { PlataformsService } from './plataforms.service';

@Module({
  controllers: [PlataformsController],
  providers: [PlataformsService]
})
export class PlataformsModule {}
