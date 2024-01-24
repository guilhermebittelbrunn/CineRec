import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@Controller('genres')
@ApiTags('genres')
export class GenresController {}
