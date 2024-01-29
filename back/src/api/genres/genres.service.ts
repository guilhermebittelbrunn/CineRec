import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async findOne(id: string): Promise<Genre> {
    const genre = await this.genreRepository.findOneBy({ id });
    if (!genre) {
      throw new NotFoundException(`genre with id: ${id} not found`);
    }
    return genre;
  }
}
