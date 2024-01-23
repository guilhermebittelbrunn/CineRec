import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { CreateList } from './dtos/create-list.dto';
import { GetListFilters } from './dtos/get-list-filters.dto';
import { User } from '../users/entities/user.entity';
import { DefaultUserLists } from '../../common/enums/default-user-lists.enum';

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

  async findAll(idUser: string): Promise<List[]> {
    return await this.listRepository.find({ where: { id: idUser } });
  }

  async create(createListDto: CreateList) {
    const { name, idUser } = createListDto;
    const list = await this.findOne({ name, idUser });

    if (list) {
      throw new ConflictException(`list ${name} already exists}`);
    }

    return await this.listRepository.save(createListDto);
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

  async delete(id: string): Promise<string> {
    const countRemovedLists = await this.listRepository.delete(id);
    if (countRemovedLists.affected === 0) {
      throw new NotFoundException(`list not found, id:${id}`);
    }
    return `list removed successfully`;
  }
}
