import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateList {
  @IsNotEmpty()
  name: string;

  @IsUUID()
  idUser: string;
}
