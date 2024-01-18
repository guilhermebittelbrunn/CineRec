import { IsOptional } from 'class-validator';

export class GetListFilters {
  @IsOptional()
  id?: string;

  @IsOptional()
  idUser?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  includeMovies?: boolean;
}
