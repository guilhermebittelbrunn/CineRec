import { Movie } from 'src/api/movies/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.genre)
  movie?: Movie[];
}
