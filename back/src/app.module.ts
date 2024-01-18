import { Module } from '@nestjs/common';
import { MoviesModule } from './api/movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresModule } from './api/genres/genres.module';
import { Movie } from './api/movies/entities/movie.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.dev.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database.sqlite',
      synchronize: true,
      logging: true,
      entities: [Movie],
    }),
    MoviesModule,
    GenresModule,
    UsersModule,
  ],
})
export class AppModule {}
