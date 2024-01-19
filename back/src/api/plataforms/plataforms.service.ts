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

  async findAll(idPlataforms: string[]): Promise<Plataform[]> {
    console.log('idPlataforms', idPlataforms);
    const query = this.plataformRepository.createQueryBuilder('plataform');
    query.andWhere('plataform.id IN (:...idPlataforms)', {
      idPlataforms,
    });
    return await query.getMany();
  }

  // async create(plataforms: Plataform[], user: User): Promise<Plataforms[]> {
  //   const x = this.plataformRepository.create({})
  //   return await this.plataformRepository.save()
  // }
}
