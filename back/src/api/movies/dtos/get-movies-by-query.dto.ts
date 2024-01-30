import { IsOptional, IsPositive } from 'class-validator';
// import { MovieGenre } from '../../genres/enums/movie-genre.enum';
import { ApiProperty } from '@nestjs/swagger';
// import { ProviderOptions } from 'src/api/providers/enum/providers-options.enum';

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
  genres?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  providers?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  listIdApi?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  moviesId?: string;
}
