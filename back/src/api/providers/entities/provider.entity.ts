import { Movie } from '../../movies/entities/movie.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('providers')
export class Provider {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  icon_path: string;

  @Column({ type: 'json', nullable: true, select: false })
  json: string;

  @ManyToMany(() => Movie, (movies) => movies.providers)
  movies?: Movie[];

  @ManyToMany(() => User, (users) => users.providers)
  users?: User[];
}
