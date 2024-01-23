import { Movie } from '../../movies/entities/movie.entity';
import { User } from '../../users/entities/user.entity';
import { DefaultUserLists } from '../../../common/enums/default-user-lists.enum';
import { ForeignKeyDefault } from '../../../common/interfaces/foreignKey-default.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ nullable: true, length: 30 })
  name: DefaultUserLists | string;

  @ManyToOne(() => User, (users) => users.lists)
  @JoinColumn({ name: 'idUser' })
  user: User;

  @ManyToMany(() => Movie, (movies) => movies.lists)
  movies?: Movie[] | ForeignKeyDefault[];
}
