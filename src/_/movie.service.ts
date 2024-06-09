import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async createMovie(movieData: Partial<Movie>): Promise<Movie> {
    const newMovie = this.movieRepository.create(movieData);
    return this.movieRepository.save(newMovie);
  }

  async findByGenre(genre: string): Promise<Movie[]> {
    return this.movieRepository.find({ where: { genre } });
  }

  async rateMovie(id: number, rating: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    movie.rating = rating;
    return this.movieRepository.save(movie);
  }

  async findSortedByRating(): Promise<Movie[]> {
    return this.movieRepository.find({ order: { rating: 'DESC' } });
  }
}
