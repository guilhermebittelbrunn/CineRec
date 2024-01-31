import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { GetMoviesByQuery } from './dtos/get-movies-by-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('movies')
@ApiTags('movies')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get()
  findAll(@Query() movieFiltersDto: GetMoviesByQuery): Promise<Movie[]> {
    return this.movieService.findAll(movieFiltersDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any): Promise<Movie> {
    console.log(req.user);
    return this.movieService.findOne(id);
  }
}
