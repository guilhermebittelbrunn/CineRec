import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateList } from './dtos/create-list.dto';
import { List } from './entities/list.entity';
import { ListsService } from './lists.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('lists')
@ApiTags('lists')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ListsController {
  constructor(private listService: ListsService) {}

  @Post()
  create(@Body() createListDTO: CreateList): Promise<List> {
    return this.listService.create(createListDTO);
  }
}
