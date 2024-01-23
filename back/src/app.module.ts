import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MoviesModule } from './api/movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresModule } from './api/genres/genres.module';
import { Movie } from './api/movies/entities/movie.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { ListsModule } from './api/lists/lists.module';
import { User } from './api/users/entities/user.entity';
import { List } from './api/lists/entities/list.entity';
import { Genre } from './api/genres/entities/genre.entity';
import { Plataform } from './api/plataforms/entities/plataform.entity';
import { AuthModule } from './api/auth/auth.module';
import { PlataformsModule } from './api/plataforms/plataforms.module';
import { LoggerMiddleware } from './config/logger/logger.middleware';

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
      entities: [Movie, User, List, Genre, Plataform],
    }),
    MoviesModule,
    GenresModule,
    UsersModule,
    ListsModule,
    AuthModule,
    PlataformsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
