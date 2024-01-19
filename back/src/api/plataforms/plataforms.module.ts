import { Module } from '@nestjs/common';
import { PlataformsController } from './plataforms.controller';
import { PlataformsService } from './plataforms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plataform } from './entities/plataform.entity';

@Module({
  controllers: [PlataformsController],
  providers: [PlataformsService],
  imports: [TypeOrmModule.forFeature([Plataform])],
  exports: [PlataformsService],
})
export class PlataformsModule {}
