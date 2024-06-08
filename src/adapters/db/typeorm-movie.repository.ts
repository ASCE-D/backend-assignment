
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { MovieRepository } from '../../movie/repositories/movie.repository';
import { Movie } from '../../movie/entities/movie.entity';
import { MovieEntity } from './movie.entity';

@Injectable()
export class TypeOrmMovieRepository implements MovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findById(id: number): Promise<Movie | null> {
    return this.movieRepository.findOne({ where: { id } });
  }

  async findByGenre(genre: string): Promise<Movie[]> {
    return this.movieRepository.find({ where: { genre } });
  }

  async sortByRating(): Promise<Movie[]> {
    return this.movieRepository.find({
      order: {
        rating: 'DESC',
      },
    });
  }
  
  async save(movie: Movie): Promise<Movie> {
    const movieEntity = this.movieRepository.create(movie);
    return this.movieRepository.save(movieEntity);
  }

  async rateMovie(id: number, rating: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    movie.rating = rating;
    return this.movieRepository.save(movie);
  }
}
