import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieClassification } from '../enums/movie-classification.enum';
import { Genre } from 'src/api/genres/entities/genre.entity';
import { List } from 'src/api/lists/entities/list.entity';
import { Plataform } from 'src/api/plataforms/entities/plataform.entity';

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

  @Column({ nullable: true, type: 'json' })
  json: string;

  @ManyToMany(() => Genre, (genre) => genre.movie)
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
  genre?: Genre[];

  @ManyToMany(() => List, (list) => list.movie)
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
  list?: List[];

  @ManyToMany(() => Plataform, (plataform) => plataform.movie)
  @JoinTable({
    name: 'plataformMovie',
    joinColumn: {
      name: 'idMovie',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idPlataform',
      referencedColumnName: 'id',
    },
  })
  plataform?: Plataform[];
}
