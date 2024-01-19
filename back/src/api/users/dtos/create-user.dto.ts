import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUser {
  @MinLength(4)
  name: string;

  @IsEmail()
  email: string;

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

  @IsNotEmpty()
  movies: string[];

  @IsNotEmpty()
  plataforms: string[];
}
