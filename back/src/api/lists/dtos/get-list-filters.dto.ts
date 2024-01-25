import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetListFilters {
  @ApiProperty({ required: false })
  @IsOptional()
  id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  idUser?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  includeMovies?: boolean;
}
