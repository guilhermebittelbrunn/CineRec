import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Provider } from './entities/provider.entity';

@Controller('providers')
@ApiTags('providers')
@UseGuards(AuthGuard('jwt'))
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  findAll(@Query('providers') providers: string): Promise<Provider[]> {
    return this.providersService.findAll(providers);
  }
}
