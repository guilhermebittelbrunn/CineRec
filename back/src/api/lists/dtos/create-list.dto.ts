import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateList {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsUUID()
  idUser: string;
}
