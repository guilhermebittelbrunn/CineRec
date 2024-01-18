import { CreateUser } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private uersService: UsersService) {}

  @Post()
  create(createUserDto: CreateUser): Promise<void> {
    return this.uersService.create(createUserDto);
  }
}
