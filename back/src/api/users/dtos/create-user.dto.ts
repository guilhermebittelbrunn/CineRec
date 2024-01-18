import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsEmail()
  email: string;

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
}
