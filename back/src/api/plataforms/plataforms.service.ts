import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plataform } from './entities/plataform.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PlataformsService {
  constructor(
    @InjectRepository(Plataform)
    private plataformRepository: Repository<Plataform>,
  ) {}

  async findAll(idPlataforms: string): Promise<Plataform[]> {
    const query = this.plataformRepository.createQueryBuilder('plataform');
    query.andWhereInIds(JSON.parse(idPlataforms));
    return await query.getMany();
  }
}
