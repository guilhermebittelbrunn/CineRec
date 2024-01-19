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
import { ListsService } from '../lists/lists.service';
import { PlataformsService } from '../plataforms/plataforms.service';
import { DefaultUserLists } from 'src/common/enums/default-user-lists.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private listService: ListsService,
    private plataformService: PlataformsService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ email });
    return user;
  }

  async create(createUserDto: CreateUser): Promise<void> {
    const { password, plataforms, movies } = createUserDto;
    const salt = await bcrypt.genSalt();
    const cryptedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create(createUserDto);

    user.password = cryptedPassword;
    user.plataform = await this.plataformService.findAll(plataforms);

    try {
      await this.userRepository.save(user);
      await this.listService.createDefaultLists(user);
      const favoriteList = await this.listService.findOne({
        id: user.id,
        name: DefaultUserLists.Favoritos,
      });

      favoriteList.movie = movies;
      // await this.listService.save(movies);
    } catch (error) {
      if (error.errno === 19) {
        throw new ConflictException('E-mail already exists, try again');
      }
      throw new InternalServerErrorException();
    }
  }
}
