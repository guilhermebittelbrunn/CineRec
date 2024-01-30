import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { CreateList } from './dtos/create-list.dto';
import { GetListFilters } from './dtos/get-one-list-filters.dto';
import { User } from '../users/entities/user.entity';
import { DefaultUserLists } from '../../common/enums/default-user-lists.enum';
import { UpdateList } from './dtos/update-list.dto';
import { GetAllListFilters } from './dtos/get-all-list-filters.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  async findOne(listFiltersDto: GetListFilters): Promise<List> {
    const query = this.listRepository.createQueryBuilder('list');
    const { id, idUser, name, includeMovies } = listFiltersDto;

    if (id) {
      query.andWhere('list.id = :id', { id });
    }

    if (idUser) {
      query.andWhere('list.idUser = :idUser', { idUser });
    }

    if (name) {
      query.andWhere('list.name = :name', { name });
    }

    if (includeMovies) {
      query.leftJoinAndSelect('list.movie', 'movie');
    }

    const list: List = await query.getOne();

    return list;
  }

  async findAll(
    getFiltersDto: GetAllListFilters,
    idUser: string,
  ): Promise<List[]> {
    const { showMovies, name } = getFiltersDto;
    const query = this.listRepository.createQueryBuilder('lists');
    query.andWhere('lists.idUser = :idUser', { idUser });

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
    const list = await this.findOne({ name, idUser: user.id });

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
      return `list updated`;
    }
  }

  async delete(id: string): Promise<string> {
    const countRemovedLists = await this.listRepository.delete(id);
    if (countRemovedLists.affected === 0) {
      throw new NotFoundException(`list not found, id:${id}`);
    }
    return `list removed successfully`;
  }
}
