import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { GetMoviesByQuery } from './dtos/get-movies-by-query.dto';
import { ListsService } from '../lists/lists.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    private listService: ListsService,
  ) {}

  async findAll(movieFiltersDto: GetMoviesByQuery): Promise<Movie[]> {
    const { title, limit, genres, listIdApi, moviesId, providers } =
      movieFiltersDto;

    console.log(movieFiltersDto);

    const query = this.movieRepository
      .createQueryBuilder('movies')
      .limit(limit)
      .leftJoinAndSelect('movies.genres', 'genres')
      .leftJoinAndSelect('movies.lists', 'lists');
    // .leftJoinAndSelect('movies.platforms', 'platforms');

    if (title) {
      query.andWhere('movies.title LIKE :title', { title: `%${title}%` });
    }

    if (moviesId) {
      query.andWhere('movies.id IN (:...moviesId)', { moviesId });
    }

    if (genres) {
      query.andWhere('movies.genres IN (:...genres)', { genres });
    }

    if (listIdApi) {
      query.andWhere('movies.lists IN (:...listIdApi)', { listIdApi });
    }

    if (providers) {
      query.andWhere('movies.providers IN (:...providers)', { providers });
    }

    const movies = await query.getMany();
    return movies;
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository
      .createQueryBuilder('movies')
      .andWhereInIds(id)
      .leftJoinAndSelect('movies.genres', 'genres')
      .leftJoinAndSelect('movies.providers', 'providers')
      .getOne();

    if (!movie) {
      throw new NotFoundException(`movie with id: ${id} not found`);
    }

    return movie;
  }
}
