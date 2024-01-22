import { Movie } from 'src/api/movies/entities/movie.entity';
import { User } from 'src/api/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('plataforms')
export class Plataform {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  icon_path: string;

  @Column({ type: 'json', nullable: true })
  json: string;

  @ManyToMany(() => Movie, (movies) => movies.genres)
  movies?: Movie[];

  @ManyToMany(() => User, (users) => users.plataforms)
  users?: User[];
}
