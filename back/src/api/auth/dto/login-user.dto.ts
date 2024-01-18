import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUser {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
