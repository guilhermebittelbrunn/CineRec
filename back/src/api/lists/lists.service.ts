import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { CreateList } from './dtos/create-list.dto';
import { User } from '../users/entities/user.entity';
import { DefaultUserLists } from '../../common/enums/default-user-lists.enum';
import { UpdateList } from './dtos/update-list.dto';
import { GetAllListFilters } from './dtos/get-all-list-filters.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  async findOne(id: string, user: User): Promise<List> {
    return await this.listRepository
      .createQueryBuilder('lists')
      .leftJoinAndSelect('lists.movies', 'movies')
      .andWhere('lists.idUser = :idUser', { idUser: user.id })
      .whereInIds(id)
      .getOne();
  }

  async findAll(
    getFiltersDto: GetAllListFilters,
    idUser: string,
  ): Promise<List[]> {
    const { showMovies, name } = getFiltersDto;
    const query = this.listRepository
      .createQueryBuilder('lists')
      .andWhere('lists.idUser = :idUser', { idUser });

    if (showMovies) {
      query.leftJoinAndSelect('lists.movies', 'movies');
    }

    if (name) {
      query.andWhere('lists.name = :name', { name });
    }

    return await query.getMany();
  }

  async create(createListDto: CreateList, user: User): Promise<List> {
    const { name } = createListDto;
    const list = await this.findAll({ name, showMovies: false }, user.id);

    if (list) {
      throw new ConflictException(`List already exists`);
    }
    return await this.listRepository.save({ ...createListDto, user });
  }

  async createDefaultLists(user: User, moviesId: string[]): Promise<void> {
    await this.listRepository.save([
      {
        name: DefaultUserLists['Favoritos'],
        user,
        movies: moviesId.map((idMovie) => ({ id: idMovie })),
      },
      { name: DefaultUserLists['Assistidos'], user },
      { name: DefaultUserLists['Assistir mais tarde'], user },
    ]);
  }

  async update(updateListDto: UpdateList, idUser: string): Promise<string> {
    const { name, id } = updateListDto;
    const list = await this.findAll({ name, showMovies: false }, idUser);
    if (list.length > 0) {
      throw new ConflictException(`Name ${name} already in use`);
    }
    const { affected } = await this.listRepository.update(id, { name });
    if (affected > 0) {
      return `list updated succesfully`;
    }
  }

  async delete(id: string, user: User): Promise<string> {
    const list = await this.findOne(id, user);
    if (list) {
      await this.listRepository.delete(list.id);
      return `list removed successfully`;
    }
    throw new NotFoundException(`list not found, id:${id}`);
  }
}
