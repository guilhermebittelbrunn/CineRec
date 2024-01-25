import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUser {
  @ApiProperty()
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MaxLength(30)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
    },
    { message: 'Password is too weak, try other password' },
  )
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  movies: string[];

  @ApiProperty()
  @IsNotEmpty()
  plataforms: string[];
}
