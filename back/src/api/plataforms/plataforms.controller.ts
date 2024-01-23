import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Plataform } from './entities/plataform.entity';
import { PlataformsService } from './plataforms.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('plataforms')
@UseGuards(AuthGuard('jwt'))
export class PlataformsController {
  constructor(private plataformService: PlataformsService) {}

  @Get()
  findAll(@Query('plataforms') idPlataforms: string): Promise<Plataform[]> {
    return this.plataformService.findAll(idPlataforms);
  }
}
