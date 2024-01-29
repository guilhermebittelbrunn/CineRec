import {
  Body,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dtos/create-user.dto';
import { ListsService } from '../lists/lists.service';
import { UpdateUser } from './dtos/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private listService: ListsService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`Not found any user with email: ${email}`);
    }
    return user;
  }

  async create(createUserDto: CreateUser): Promise<string> {
    const { providers, movies, ...rest } = createUserDto;
    const user: User = this.userRepository.create({
      ...rest,
      providers: providers.map((idProvider) => ({ id: idProvider })),
    });

    try {
      await this.userRepository.save(user);
      await this.listService.createDefaultLists(user, movies);
      return `user ${user.name} created successfully`;
    } catch (error) {
      if (error.errno === 19) {
        throw new ConflictException('E-mail already exists, try again');
      }
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

  async update(
    id: string,
    @Body() updateUserDto: UpdateUser,
  ): Promise<Partial<User>> {
    const { name, email, providers } = updateUserDto;
    const user: User = this.userRepository.create({ id, name, email });
    if (providers?.length > 0) {
      user.providers = providers.map((idProvider) => ({ id: idProvider }));
    }
    return await this.userRepository.save(user);
  }
}
