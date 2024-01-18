import { Body, Controller, Post } from '@nestjs/common';
import { CreateList } from './dtos/create-list.dto';
import { List } from './entities/list.entity';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private listService: ListsService) {}

  @Post()
  create(@Body() createListDTO: CreateList): Promise<List> {
    return this.listService.create(createListDTO);
  }
}
