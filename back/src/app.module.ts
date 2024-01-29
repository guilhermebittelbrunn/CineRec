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
import { AuthModule } from './api/auth/auth.module';
import { LoggerMiddleware } from './config/logger/logger.middleware';
import { Provider } from './api/providers/entities/provider.entity';
import { ProvidersModule } from './api/providers/providers.module';

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
      entities: [Movie, User, List, Genre, Provider],
    }),
    MoviesModule,
    GenresModule,
    UsersModule,
    ListsModule,
    AuthModule,
    ProvidersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
