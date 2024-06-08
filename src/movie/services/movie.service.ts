
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MOVIE_REPOSITORY, MovieRepository } from '../repositories/movie.repository';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: MovieRepository,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.findAll();
  }

  async findById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async create(movie: Movie): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  async rateMovie(id: number, rating: number): Promise<Movie> {
    return this.movieRepository.rateMovie(id, rating);
  }

  async findByGenre(genre: string): Promise<Movie[]> {
    return this.movieRepository.findByGenre(genre);
  }

  async sortByRating(): Promise<Movie[]> {
    return this.movieRepository.sortByRating();
  }
}
