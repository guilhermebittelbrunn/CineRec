import { IsOptional, IsEmail, MinLength } from 'class-validator';

export class UpdateUser {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(4)
  name?: string;

  @IsOptional()
  plataforms?: string[];
}
