import { Controller, Get, Query } from '@nestjs/common';
import { Plataform } from './entities/plataform.entity';
import { PlataformsService } from './plataforms.service';

@Controller('plataforms')
export class PlataformsController {
  constructor(private plataformService: PlataformsService) {}

  @Get()
  findAll(@Query() idPlataforms: string[]): Promise<Plataform[]> {
    return this.plataformService.findAll(idPlataforms);
  }
}
