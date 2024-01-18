import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';

@Module({
  controllers: [ListsController],
  providers: [ListsService],
  imports: [TypeOrmModule.forFeature([List])],
})
export class ListsModule {}
