import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ email });
    return user;
  }

  async create(createUserDto: CreateUser): Promise<void> {
    const { password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const cryptedPassword = bcrypt.hash(password, salt);

    try {
      await this.userRepository.save({
        password: cryptedPassword,
        ...createUserDto,
      });
    } catch (error) {
      if (error.errno === 19) {
        throw new ConflictException('E-mail already exists, try again');
      }
      throw new InternalServerErrorException();
    }
  }
}
