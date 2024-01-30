import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { GetMoviesByQuery } from './dtos/get-movies-by-query.dto';
import { ListsService } from '../lists/lists.service';
import { PushIntoList } from './dtos/push-into-list.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    private listService: ListsService,
  ) {}

  async findAll(movieFiltersDto: GetMoviesByQuery): Promise<Movie[]> {
    const { title, limit, genres, listIdApi, moviesId, providers } =
      movieFiltersDto;

    const query = this.movieRepository
      .createQueryBuilder('movies')
      .limit(limit)
      .leftJoinAndSelect('movies.genres', 'genres')
      .leftJoinAndSelect('movies.providers', 'providers')
      .orderBy('movies.score_popularity', 'DESC');

    if (title) {
      query.andWhere('movies.title LIKE :title', { title: `%${title}%` });
    }

    if (moviesId) {
      query.andWhereInIds(JSON.parse(moviesId));
    }

    if (genres) {
      query.andWhere('genres.id IN (:...genres)', {
        genres: JSON.parse(genres),
      });
    }

    if (listIdApi) {
      query.leftJoinAndSelect('movies.lists', 'lists');
      query.andWhere('lists.id IN (:...listIdApi)', {
        listIdApi: JSON.parse(listIdApi),
      });
    }

    if (providers) {
      query.andWhere('providers.id IN (:...providers)', {
        providers: JSON.parse(providers),
      });
    }

    return await query.getMany();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository
      .createQueryBuilder('movies')
      .andWhereInIds(id)
      .leftJoinAndSelect('movies.genres', 'genres')
      .leftJoinAndSelect('movies.lists', 'lists')
      .leftJoinAndSelect('movies.providers', 'providers')
      .getOne();

    if (!movie) {
      throw new NotFoundException(`movie with id: ${id} not found`);
    }

    return movie;
  }

  // async pushIntoList(
  //   pushIntoListDto: PushIntoList,
  //   user: User,
  // ): Promise<List> {

  // }
}
