import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, MinLength } from 'class-validator';

export class UpdateUser {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MinLength(4)
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  providers?: string[];
}
