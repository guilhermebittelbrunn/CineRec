import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Genre])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
