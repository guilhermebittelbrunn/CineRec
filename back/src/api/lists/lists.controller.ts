import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateList } from './dtos/create-list.dto';
import { List } from './entities/list.entity';
import { ListsService } from './lists.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateList } from './dtos/update-list.dto';
import { GetUser } from 'src/common/decoratos/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { GetAllListFilters } from './dtos/get-all-list-filters.dto';
import { DefineMovieAtList } from './dtos/define-movie-at-list.dto';

@Controller('lists')
@ApiTags('lists')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ListsController {
  constructor(private listService: ListsService) {}

  @Get()
  findAll(
    @Body() getFiltersDto: GetAllListFilters,
    @GetUser() user: User,
  ): Promise<List[]> {
    return this.listService.findAll(getFiltersDto, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User): Promise<List> {
    return this.listService.findOne(id, user);
  }

  @Post()
  create(
    @Body() createListDTO: CreateList,
    @GetUser() user: User,
  ): Promise<List> {
    return this.listService.create(createListDTO, user);
  }

  @Post(':id/movie/:idMovie')
  pushMovie(
    @Param() pushMovieDto: DefineMovieAtList,
    @GetUser() user: User,
  ): Promise<List | string> {
    return this.listService.pushMovie(pushMovieDto, user);
  }

  @Patch()
  update(
    @Body() updateListDto: UpdateList,
    @GetUser() user: User,
  ): Promise<string> {
    const { id } = user;
    return this.listService.update(updateListDto, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() user: User): Promise<string> {
    return this.listService.delete(id, user);
  }

  @Delete(':id/movie/:idMovie')
  removeMovie(
    @Param() removeListDto: DefineMovieAtList,
    @GetUser() user: User,
  ): Promise<List | string> {
    return this.listService.removeMovie(removeListDto, user);
  }
}
