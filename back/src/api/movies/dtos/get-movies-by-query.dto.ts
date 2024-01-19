import { IsOptional, IsPositive } from 'class-validator';
import { MovieGenre } from 'src/api/genres/enums/movie-genre.enum';
import { PlataformsOptions } from 'src/api/plataforms/enums/plataforms-options.enum';

export class GetMoviesByQuery {
  @IsPositive()
  @IsOptional()
  limit?: number = 50;

  @IsOptional()
  title?: string = '';

  @IsOptional()
  genres?: MovieGenre[];

  @IsOptional()
  streamings?: PlataformsOptions[];

  @IsOptional()
  listIdApi?: string[];

  @IsOptional()
  moviesId?: string[];
}
