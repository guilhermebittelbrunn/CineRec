import { IsOptional, IsPositive } from 'class-validator';
import { MovieGenre } from '../../genres/enums/movie-genre.enum';
import { PlataformsOptions } from '../../plataforms/enums/plataforms-options.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetMoviesByQuery {
  @ApiProperty({ required: false })
  @IsPositive()
  @IsOptional()
  limit?: number = 50;

  @ApiProperty({ required: false })
  @IsOptional()
  title?: string = '';

  @ApiProperty({ required: false })
  @IsOptional()
  genres?: MovieGenre[];

  @ApiProperty({ required: false })
  @IsOptional()
  platforms?: PlataformsOptions[];

  @ApiProperty({ required: false })
  @IsOptional()
  listIdApi?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  moviesId?: string[];
}
