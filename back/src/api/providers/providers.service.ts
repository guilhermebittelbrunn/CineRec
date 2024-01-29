import { Injectable } from '@nestjs/common';
import { Provider } from './entities/provider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async findAll(idProviders?: string): Promise<Provider[]> {
    const query = this.providerRepository.createQueryBuilder('provider');
    if (idProviders) {
      query.andWhereInIds(JSON.parse(idProviders));
    }
    return await query.getMany();
  }
}
