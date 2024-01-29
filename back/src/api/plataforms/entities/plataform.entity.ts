import { Movie } from '../../movies/entities/movie.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('platforms')
export class Platform {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  icon_path: string;

  @Column({ type: 'json', nullable: true, select: false })
  json: string;

  @ManyToMany(() => Movie, (movies) => movies.genres)
  movies?: Movie[];

  @ManyToMany(() => User, (users) => users.platforms)
  users?: User[];
}
