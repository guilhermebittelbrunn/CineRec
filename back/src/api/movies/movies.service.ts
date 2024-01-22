import { Injectable } from '@nestjs/common';
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
    const { title, limit, genres, listIdApi, moviesId, streamings } =
      movieFiltersDto;

    const query = this.movieRepository
      .createQueryBuilder('movies')
      .limit(limit);

    if (title) {
      query.andWhere('movies.title LIKE :title', { title: `%${title}%` });
    }

    if (moviesId) {
      query.andWhere('movies.id IN (:...moviesId)', { moviesId });
    }

    const movies = await query.getMany();
    console.log(movies.length);
    return movies;
  }

  async findOne(id: string): Promise<Movie> {
    return this.movieRepository.findOneBy({ id });
  }

  // async pushIntoList(idList: string, idMovies: string[]): Promise<void> {
  //   const movies: Movie[] = await this.findAll({ moviesId: idMovies });
  //   this.listService.saveMovies(idList, movies);
  // }
}
