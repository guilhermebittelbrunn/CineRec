import { IsNotEmpty } from 'class-validator';

export class DefineMovieAtList {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  idMovie: string;
}
