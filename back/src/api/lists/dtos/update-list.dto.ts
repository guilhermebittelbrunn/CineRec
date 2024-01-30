import { IsNotEmpty } from 'class-validator';

export class UpdateList {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
}
