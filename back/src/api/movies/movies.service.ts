import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { GetMoviesByQuery } from './dtos/get-movies-by-query.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async findAll(movieFiltersDto: GetMoviesByQuery): Promise<Movie[]> {
    const { title, limit, genres, listIdApi, streamings } = movieFiltersDto;
    const query = this.movieRepository.createQueryBuilder('movie').limit(limit);

    if (title) {
      query.andWhere('product.title LIKE :title', { title: `%${title}%` });
    }

    return await query.getMany();
  }

  async findOne(id: string): Promise<Movie> {
    return this.movieRepository.findOneBy({ id });
  }
}
