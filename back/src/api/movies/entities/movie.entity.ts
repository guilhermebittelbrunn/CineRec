import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieClassification } from '../enums/movie-classification.enum';
import { Genre } from '../../genres/entities/genre.entity';
import { List } from '../../lists/entities/list.entity';
import { Provider } from 'src/api/providers/entities/provider.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  sinopse: string;

  @Column()
  duration: number;

  @Column()
  original_title: string;

  @Column({ default: 0 })
  score_vote: number;

  @Column({ default: 0 })
  count_votes: number;

  @Column()
  release: string;

  @Column()
  score_popularity: number;

  @Column({ nullable: true })
  poster_path: string;

  @Column({ nullable: true })
  backdrop_path: string;

  @Column({ default: MovieClassification.geral })
  adult: MovieClassification;

  @Column({ nullable: true })
  idApi: string;

  @Column({ nullable: true, type: 'json', select: false })
  json: string;

  @ManyToMany(() => Genre, (genres) => genres.movies)
  @JoinTable({
    name: 'movieGenre',
    joinColumn: {
      name: 'idMovie',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idGenre',
      referencedColumnName: 'id',
    },
  })
  genres?: Genre[];

  @ManyToMany(() => List, (lists) => lists.movies)
  @JoinTable({
    name: 'movieList',
    joinColumn: {
      name: 'idMovie',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idList',
      referencedColumnName: 'id',
    },
  })
  lists?: List[];

  @ManyToMany(() => Provider, (providers) => providers.movies)
  @JoinTable({
    name: 'providerMovie',
    joinColumn: {
      name: 'idMovie',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idProvider',
      referencedColumnName: 'id',
    },
  })
  providers?: Provider[];
}
