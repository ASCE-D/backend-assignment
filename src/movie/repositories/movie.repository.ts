
import { Movie } from '../entities/movie.entity';

export const MOVIE_REPOSITORY = 'MOVIE_REPOSITORY';

export interface MovieRepository {
  findAll(): Promise<Movie[]>;
  findById(id: number): Promise<Movie | null>;
  save(movie: Movie): Promise<Movie>;
  rateMovie(id: number, rating: number): Promise<Movie>;
  findByGenre(genre: string): Promise<Movie[]>;
  sortByRating(): Promise<Movie[]>;
}
