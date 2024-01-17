import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { GetMoviesByQuery } from './dtos/get-movies-by-query.dto';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get()
  findAll(@Query() movieFiltersDto: GetMoviesByQuery): Promise<Movie[]> {
    return this.movieService.findAll(movieFiltersDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findOne(id);
  }
}
