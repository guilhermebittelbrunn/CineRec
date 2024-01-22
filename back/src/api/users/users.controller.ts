import { CreateUser } from './dtos/create-user.dto';
import { UpdateUser } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUser): Promise<string> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUser,
  ): Promise<Partial<User>> {
    return this.usersService.update(id, updateUserDto);
  }
}
