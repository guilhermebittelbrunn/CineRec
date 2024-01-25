import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Plataform } from './entities/plataform.entity';
import { PlataformsService } from './plataforms.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('plataforms')
@ApiTags('plataforms')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class PlataformsController {
  constructor(private plataformService: PlataformsService) {}

  @Get()
  findAll(@Query('plataforms') idPlataforms: string): Promise<Plataform[]> {
    return this.plataformService.findAll(idPlataforms);
  }
}
