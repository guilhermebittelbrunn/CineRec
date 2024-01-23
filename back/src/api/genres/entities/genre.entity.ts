import { Movie } from '../../movies/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Movie, (movies) => movies.genres)
  movies?: Movie[];
}
