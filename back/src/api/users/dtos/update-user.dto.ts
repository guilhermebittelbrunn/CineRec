import { IsOptional, IsEmail, MinLength } from 'class-validator';
import { ForeignKeyDefault } from 'src/common/interfaces/foreignKey-default.interface';

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
