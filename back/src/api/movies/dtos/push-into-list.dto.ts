import { IsNotEmpty } from 'class-validator';

export class PushIntoList {
  @IsNotEmpty()
  idList: string;

  @IsNotEmpty()
  idMovie: string;
}
