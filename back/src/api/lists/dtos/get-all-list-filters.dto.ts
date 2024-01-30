import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetAllListFilters {
  @ApiProperty({ required: false })
  @IsOptional()
  name?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  showMovies?: boolean = true;
}
