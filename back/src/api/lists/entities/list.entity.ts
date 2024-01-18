import { Movie } from 'src/api/movies/entities/movie.entity';
import { User } from 'src/api/users/entities/user.entity';
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
  name: string;

  @ManyToOne(() => User, (user) => user.list)
  @JoinColumn({ name: 'idUser' })
  user: User;

  @ManyToMany(() => Movie, (movie) => movie.list)
  movie: Movie;
}
