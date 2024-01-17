import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MovieClassification } from '../enums/movie-classification.enum';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  title: string;

  @Column()
  sinopse: string;

  @Column()
  duration: number;

  @Column()
  original_title: string;

  @Column({ default: 0 })
  score_votes: number;

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

  @Column()
  idApi: string;
}
