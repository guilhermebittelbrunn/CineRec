import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Genre } from './entities/genre.entity';
import { GenresService } from './genres.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('genres')
@ApiTags('genres')
@UseGuards(AuthGuard('jwt'))
export class GenresController {
  constructor(private genreService: GenresService) {}

  @Get()
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Genre> {
    return this.genreService.findOne(id);
  }
}
